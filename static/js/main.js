document.getElementById('music-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const modelSize = document.getElementById('model_size').value;
    const generateBtn = document.getElementById('generate-btn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const downloadLink = document.getElementById('download-link');
    const error = document.getElementById('error');
    
    // Reset UI
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    error.classList.add('hidden');
    generateBtn.disabled = true;
    
    try {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('model_size', modelSize);
        
        const response = await fetch('/generate', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate music');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'generated_music.wav';
        
        loading.classList.add('hidden');
        result.classList.remove('hidden');
    } catch (err) {
        error.textContent = `Error: ${err.message}`;
        error.classList.remove('hidden');
        loading.classList.add('hidden');
    } finally {
        generateBtn.disabled = false;
    }
});