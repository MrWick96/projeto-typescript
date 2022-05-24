

interface Veiculo{
    nome: string;
    placa: string;
    entrada: Date | string;
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function CalcTempo(mil: number){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function Patio(){

        function Ler(): Veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function Salvar(veiculos: Veiculo[]){
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function Adicionar(veiculo: Veiculo, salva?: boolean){
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
                `;

                row.querySelector(".delete")?.addEventListener("click", function(){
                    Remover(this.dataset.placa);
                });

            $("#patio")?.appendChild(row);

            if("salva"){
                Salvar([...Ler(), veiculo]);
            }
            
        }

        function Remover(placa: string){
            const {entrada, nome} = Ler().find(veiculo => veiculo.placa === placa);

            const tempo = CalcTempo(new Date().getTime() - new Date(entrada).getTime());

            if(confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

            Salvar(Ler().filter((veiculo) => veiculo.placa !== placa));
            Render();
        }

        function Render(){
            $("#patio")!.innerHTML = "";
            const patio = Ler();

            if(patio.length){
                patio.forEach((veiculo) => Adicionar(veiculo));
            }
        }

        return{Ler, Adicionar, Remover, Salvar, Render}
    }

    Patio().Render();
    $("#cadastrar")?.addEventListener("click", () =>{
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;

        if(!nome || !placa){
            alert("Os campos nome e placa são obrigatórios");
            return;
        }

        Patio().Adicionar({nome, placa, entrada: new Date().toISOString() }, true);
    });
})();