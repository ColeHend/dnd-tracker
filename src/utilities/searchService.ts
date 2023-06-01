export default class SearchService {
    constructor(private axios: any) {
        this.axios = axios;
    }
    public async spellSearch(searchTerm: string, key: string) {
        const search = async (key: string, searchTerm: string) => {
            const res = await this.axios.post("http://localhost:4000/api/srd/spells/search", { key, searchTerm })
            return res.data
        }
        return await search(key, searchTerm)
    }
    public async monsterSearch(searchTerm: string, key: string) {
        const search = async (key: string, searchTerm: string) => {
            const res = await this.axios.post("http://localhost:4000/api/srd/monsters/search", { key, searchTerm })
            return res.data
        }
        return await search(key, searchTerm)
    }
}