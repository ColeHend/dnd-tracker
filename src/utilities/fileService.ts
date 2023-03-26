class JsonService {
    public load(filename: string) {
        const jsonString = localStorage.getItem(filename);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    }
    public save<T>(filename: string, data: T): void {
        const jsonString = JSON.stringify(data, null, 2);
        localStorage.setItem(filename, jsonString);
    }
    download(filename: string, data: Object[]): void {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
      }
  }
  
export default class FileService {
    private jsonService: JsonService = new JsonService();
    public searchOptions = ['spells'];
    
    private spells: Object[] = this.jsonService.load('./5e-SRD-Spells.json') ;
    public getSpells = () => {
        return this.spells;
    }
    public downloadSpells = () => {
        this.jsonService.download('spells.json', this.spells);
    }
    public saveFile = (filename: string, data: Object[]) => {
        this.jsonService.save(filename, data);
    }
    public searchFile = (searchTerm: String,searchKey:string, searchOption: string='spells') => {
       let keys = searchKey.split('.');
        if (searchOption === 'spells') {
            switch (keys.length) {
                case 1:
                    return this.spells?.filter((item: any) => item[searchKey].toLowerCase().includes(searchTerm.toLowerCase()));
                case 2:
                    return this.spells?.filter((item: any) => item[keys[0]][keys[1]].toLowerCase().includes(searchTerm.toLowerCase()));
                case 3:
                    return this.spells?.filter((item: any) => item[keys[0]][keys[1]][keys[2]].toLowerCase().includes(searchTerm.toLowerCase()));
                default:
                    return this.spells?.filter((item: any) => item[searchKey].toLowerCase().includes(searchTerm.toLowerCase()));
            }
        }
    }
}

