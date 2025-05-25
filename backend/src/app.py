from flask import Flask, render_template, request, send_file, jsonify
import os
import time
from music_generator import generate_music

app = Flask(__name__)

# Directory for generated files
GENERATED_DIR = "generated"
if not os.path.exists(GENERATED_DIR):
    os.makedirs(GENERATED_DIR)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_music_endpoint():
    description = request.form.get('description')
    model_size = request.form.get('model_size', 'small')  # Default to small model
    if not description:
        return jsonify({'error': 'Description is required'}), 400
    if model_size not in ['small', 'medium']:
        return jsonify({'error': 'Invalid model size'}), 400

    try:
        # Generate unique filename with timestamp
        timestamp = int(time.time())
        output_file = os.path.join(GENERATED_DIR, f"output_{timestamp}.wav")
        
        # Generate music using the provided description and model size
        generate_music(description, output_file, model_size)
        
        # Send the generated file for download
        return send_file(output_file, as_attachment=True, download_name="generated_music.wav")
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Clean up old generated files (keep only the latest 10)
        cleanup_generated_files()

def cleanup_generated_files():
    files = sorted(
        [f for f in os.listdir(GENERATED_DIR) if f.endswith('.wav')],
        key=lambda x: os.path.getctime(os.path.join(GENERATED_DIR, x))
    )
    # Keep only the latest 10 files
    for old_file in files[:-10]:
        try:
            os.remove(os.path.join(GENERATED_DIR, old_file))
        except OSError:
            pass

if __name__ == '__main__':
    app.run(debug=True)