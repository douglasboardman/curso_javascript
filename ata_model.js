export class Ata {
    /**
     * @type {string}
     */
    #numControlePNCP;

    /**
     * @type {string}
     */
    #modalidade;

    /**
     * @type {string}
     */
    #objetoCompra;

    /**
     * @type {Date}
     */
    #iniVigencia;

    /**
     * @type {Date}
     */
    #fimVigencia;

    /**
     * @type {number}
     */
    #anoCompra;

    /**
     * @type {number}
     */
    #sequencialCompra;

    /**
     * @type {number}
     */
    #sequencialAta;

    constructor(anoCompra, sequencialCompra, sequencialAta, iniVigencia, fimVigencia, numControlePNCP, modalidade, objetoCompra) {
        this.#anoCompra = anoCompra;
        this.#sequencialCompra = sequencialCompra;
        this.#sequencialAta = sequencialAta;
        this.#iniVigencia = new Date(iniVigencia);
        this.#fimVigencia = new Date(fimVigencia);
        this.#numControlePNCP = numControlePNCP;
        this.#modalidade = modalidade;
        this.#objetoCompra = objetoCompra;
    }

    get iniVigencia() {
        return this.#iniVigencia;
    }

    set iniVigencia(valor) {
        this.#iniVigencia = new Date(valor);
    }

    get fimVigencia() {
        return this.#fimVigencia;
    }

    set fimVigencia(valor) {
        this.#fimVigencia = new Date(valor);
    }

    get anoCompra() {
        return this.#anoCompra;
    }

    set anoCompra(valor) {
        this.#anoCompra = valor;
    }

    get sequencialCompra() {
        return this.#sequencialCompra;
    }

    set sequencialCompra(valor) {
        this.#sequencialCompra = valor;
    }

    get sequencialAta() {
        return this.#sequencialAta;
    }

    set sequencialAta(valor) {
        this.#sequencialAta = valor;
    }

    get numControlePNCP() {
        return this.#numControlePNCP;
    }

    set numControlePNCP(valor) {
        this.#numControlePNCP = valor;
    }

    get modalidade() {
        return this.#modalidade;
    }

    set modalidade(valor) {
        this.#modalidade = valor;
    }

    get objetoCompra() {
        return this.#objetoCompra;
    }

    set objetoCompra(valor) {
        this.#objetoCompra = valor;
    }
}

