import api from './api';

export default {
    /**
     *
     * @param {*} usuario
     * @param {*} senha
     * @param {function} setUsuarioApp Função para setar o usuário do App
     */
    async login(usuario, senha, setUsuarioApp, history) {
        try {
            const res = await api.post("/login", {
                usuario,
                senha
            });

            await setUsuarioApp(res.data);

            history.push("/");
        } catch (e) {
            alert(e.response.data.error || "Ocorreu um erro ao cadastrar o usuário!");
        }
    },

    /**
     *
     * @param {*} usuario
     * @param {*} senha
     * @param {function} setUsuarioApp Função para setar o usuário do App
     * @param {*} history Usado para redirect
     */
    async cadastro(usuario, senha, setUsuarioApp, history) {
        try {
            const res = await api.post("/cadastro", {
                usuario,
                senha
            });

            await setUsuarioApp(res.data);

            history.push("/");
        } catch (e) {
            alert(e.response.data.error || "Ocorreu um erro ao cadastrar o usuário!");
        }
    }
}