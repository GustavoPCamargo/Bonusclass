const inputCPF = document.getElementById("cpf")

inputCPF.addEventListener("input", (e) =>{
    let valor = e.target.value

    valor = valor.replace(/\D/g, "");

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1-$2");

    e.target.value = valor;
});