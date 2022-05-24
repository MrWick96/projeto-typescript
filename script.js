(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function CalcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function Patio() {
        function Ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function Salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function Adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
                `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                Remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if ("salva") {
                Salvar([...Ler(), veiculo]);
            }
        }
        function Remover(placa) {
            const { entrada, nome } = Ler().find(veiculo => veiculo.placa === placa);
            const tempo = CalcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            Salvar(Ler().filter((veiculo) => veiculo.placa !== placa));
            Render();
        }
        function Render() {
            $("#patio").innerHTML = "";
            const patio = Ler();
            if (patio.length) {
                patio.forEach((veiculo) => Adicionar(veiculo));
            }
        }
        return { Ler, Adicionar, Remover, Salvar, Render };
    }
    Patio().Render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        Patio().Adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
