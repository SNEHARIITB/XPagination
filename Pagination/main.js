
const table = document.getElementById("table");
const tablebody = document.getElementById("tbody");
const prevbtn = document.getElementById("prevbtn");
const nextbtn = document.getElementById("nextbtn");
const pageinfo = document.getElementById("pageinfo");

let data = [];
let currentPage = 1;
const rowsPerPage = 10;


async function fetchData(){
    try{
        const response =  await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!response.ok) throw new Error('Network error');
        data = await response.json();
        //console.log(data);
        renderTable();
    }
    catch(error){
        alert('failed to fetch data');
    }
}

function renderTable(){

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = data.slice(startIndex, endIndex);

    tablebody.innerHTML = "";

    currentRows.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.role}</td>
        `;
        tablebody.appendChild(row);
    });
    
    const totalPages = Math.ceil(data.length / rowsPerPage);
    pageinfo.textContent = `${currentPage}`;

    prevbtn.disabled = currentPage === 1;
    nextbtn.disabled = currentPage === totalPages;

}

prevbtn.addEventListener("click", () => {
    if(currentPage>1){
        currentPage--;
        renderTable();
    }
});

nextbtn.addEventListener("click", () => {
    const totalpages = Math.ceil(data.length/rowsPerPage);
    if(currentPage<totalpages){
        currentPage++;
        renderTable();
    }
})

fetchData();
