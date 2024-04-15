document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await axios.get('https://csv-upload-u0y7.onrender.com/api/csv/getall')
        const files = response.data.res;
        const tableBody = document.querySelector('tbody');
        files.forEach((file, index) => {
            const rowEl = document.createElement('tr');
            // Create and append S.No. column
            const serialNumberCell = document.createElement('th');
            serialNumberCell.textContent = index + 1;
            rowEl.appendChild(serialNumberCell);

            // Create and append Name column
            const nameCell = document.createElement('td');
            nameCell.textContent = file.originalFilename;
            rowEl.appendChild(nameCell);

            //create and append arrow icon
            const arrowCell = document.createElement('td');
            const arrowEl = document.createElement('i');
            arrowEl.classList.add('fa-solid', 'fa-arrow-right');
            arrowCell.appendChild(arrowEl)
            rowEl.appendChild(arrowCell);

            tableBody.appendChild(rowEl);

            arrowEl.addEventListener('click', async () => {
                window.location.href = `detail.html?id=${file._id}`;

            })
        });

        const alertContainer = document.getElementById('alert-container');
        const uploadbutton = document.getElementById('uploadButton');
        const fileInput = document.getElementById('file');

        uploadbutton.addEventListener('click', async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            if (!file) {
                const alertEl = document.createElement('div');
                alertEl.classList.add('alert', 'alert-danger');
                alertEl.textContent = 'No file selected';
                alertContainer.appendChild(alertEl);
                setTimeout(() => {
                    alertEl.remove();
                }, 2000)
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post('https://csv-upload-u0y7.onrender.com/api/csv/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data.success) {
                    const alertEl = document.createElement('div');
                    alertEl.classList.add('alert', 'alert-success');
                    alertEl.textContent = response.data.res;
                    alertContainer.appendChild(alertEl);
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                    

                }
            } catch (err) {
                console.error('Error uploading file:', err);
                const alertEl = document.createElement('div');
                    alertEl.classList.add('alert', 'alert-danger');
                    alertEl.textContent = err.response.data;
                    alertContainer.appendChild(alertEl);
                    setTimeout(() => {
                        alertEl.remove();
                    }, 2000)
                    return;

            }
        })

    } catch (err) {
        console.log(err);
    }

})