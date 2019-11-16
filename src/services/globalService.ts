class GloablService {
    public url = 'https://localhost:5001/api';

    public sanearMonto(value: string) {
        let valorNumerico = this.convert(value, ".", "");
        valorNumerico = this.convert(valorNumerico, ",", ".");
        return parseFloat(valorNumerico);
    }
    public convert(text: string, busca: string, reemplaza: string) {
        while (text.toString().indexOf(busca) != -1)
            text = text.toString().replace(busca, reemplaza);

        return text;
    }
}

export const globalServices = new GloablService();
