document.addEventListener('DOMContentLoaded', async function () {
    try {
        //Get csv id from query param
        var urlParams = new URLSearchParams(window.location.search);
        var fileId = urlParams.get('id');
        //request to server
        const response = await axios.get(`https://csv-upload-u0y7.onrender.com/api/csv?id=${fileId}`)
        const data = response.data.res;
        const headers = data.headers;
        const details = data.data;
        
        const pageSize = 10; // Number of rows per page
        let currentPage = 1;
        const headerRow = document.createElement('tr');
        const headingEl = document.getElementById('heading');
        const searchInput = document.getElementById('searchInput');
        headingEl.textContent = data.originalFilename;

        // create header row
        headers.forEach((header) => {
            const th = document.createElement('th');
            const sortIcon = document.createElement('i');
            sortIcon.classList.add('fas', 'fa-sort', 'mr-1');
            th.textContent = header;
            th.appendChild(sortIcon);
            headerRow.appendChild(th);
        });

        // Event listener for search input changes
        searchInput.addEventListener('input', function () {
            const searchText = searchInput.value.toLowerCase();
            const filteredData = details.filter(row => {
                for (const key in row) {
                    if (Object.hasOwnProperty.call(row, key)) {
                        const columnValue = row[key].toString().toLowerCase();
                        if (columnValue.includes(searchText)) {
                            return true; // Return true if any column matches the search text
                        }
                    }
                }
                return false; // Return false if no column matches the search text
            });
            displayData(filteredData);
        });



        // Display data for the initial page and update pagination
        async function fetchDataAndDisplay(currentPage) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, details.length);
            const currentPageData = details.slice(startIndex, endIndex);
            displayData(currentPageData);
            updatePagination();
        }
        fetchDataAndDisplay(currentPage);

        // Function to append data rows in the table 
        function displayData(data) {
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';
            tableBody.appendChild(headerRow); // Add the header row to table , create above

            data.forEach((rowData) => {
                const row = document.createElement('tr');
                // Create and append cells for each row
                headers.forEach((header) => {
                    const dataCell = document.createElement('td');
                    dataCell.textContent = rowData[header];
                    row.appendChild(dataCell);
                });
                tableBody.appendChild(row);
            });

        }
        
         // function to add and update page numbers
        function updatePagination() {
            const totalPageCount = Math.ceil(details.length / pageSize);
            const pageNumbers = document.getElementById('pageNumbers');
            pageNumbers.innerHTML = '';

            for (let i = 1; i <= totalPageCount; i++) {
                const pageNumber = document.createElement('span');
                pageNumber.textContent = i;
                pageNumber.classList.add('pageNumber', 'btn', 'btn-secondary');
                if (i === currentPage) {
                    pageNumber.classList.add('active');
                }
                pageNumbers.appendChild(pageNumber);
            }
        }

        // Function to sort the data
        function sortData(column, order) {
            details.sort((a, b) => {
                const valueA = a[column];
                const valueB = b[column];

                if (order === 'asc') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            });

            displayData(details);
        }

        //event listener for page navigation and sorting
        document.addEventListener('click', async (event) => {
            if (event.target.classList.contains('pageNumbers')) {
                currentPage = parseInt(event.target.textContent);
                await fetchDataAndDisplay(currentPage);
                updatePagination();
            } else if (event.target.id === 'prevPage') {
                if (currentPage > 1) {
                    currentPage--;
                    await fetchDataAndDisplay(currentPage);
                    updatePagination();
                }
            } else if (event.target.id === 'nextPage') {
                const totalPageCount = Math.ceil(details.length / pageSize);
                if (currentPage < totalPageCount) {
                    currentPage++;
                    await fetchDataAndDisplay(currentPage);
                    updatePagination();
                }
            }else if (event.target.tagName === 'TH') {
                
                const column = event.target.textContent;
                const currentOrder = event.target.getAttribute('data-order') || 'asc';

                // Toggle sort order
                const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                event.target.setAttribute('data-order', newOrder);

                // Update sort icon
                const sortIcon = event.target.querySelector('i');
                sortIcon.classList.remove('fa-sort', 'fa-sort-up', 'fa-sort-down');
                sortIcon.classList.add(newOrder === 'asc' ? 'fa-sort-down' : 'fa-sort-up');

                sortData(column, newOrder);
            }
        });
             
    } catch (err) {
        console.log(err);
    }
})