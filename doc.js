import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
const endpoint = 'https://api.nft.storage'
const ContractAddress = "0xA25B88E9619dfe41c89b7371844A658e7a2b6C55";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMTVkRTM4NUU0Mzc1M0RBODNGZUE0NjgzZkZhMzc4RTFjZTUyZjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODk3NjUxMTc3NCwibmFtZSI6IkRvY1QifQ.t7bF1OuxuS6S9QMP_rfl72fYMneOa1jzs-mZhdjEhog";

var file;
var docs = [];

const handleChange = async(e) => {
    file = document.getElementById("file")?.files[0];
}
document.getElementById("file")?.addEventListener("change", () => handleChange());

const addFile = async() => {
    if (file) {
    const storage = new NFTStorage({ endpoint, token });
    const doc_metadata = await storage.store({
        name: file.name,
        description: file.name,
        image: file
    });
    let saved_docs = [];
    if (localStorage.getItem("docs")) {
        saved_docs = JSON.parse(localStorage.getItem("docs"));
    }
    const doc_name = doc_metadata.data.name;
    saved_docs = [doc_name, ...saved_docs];
    localStorage.setItem("docs", JSON.stringify(saved_docs));
    const doc_url = doc_metadata.data.image.href;
    console.log(doc_url);
    window.alert("Your file has been uploaded to Metis Chain!!!")
    }

}

let num = 1;
const displayFile = async() => {
    if (localStorage.getItem("docs")) {
        docs = JSON.parse(localStorage.getItem("docs"));
            for (let i = 0; i < docs.length; i++) {
                if (num < 7) {
                const container = document.querySelector(".docs-s");
                const docs_v = document.createElement("p");
                console.log(docs[i])
                docs_v.innerHTML = num + ". &emsp; " + docs[i];
                container.append(docs_v);
                num++;
                }
              }
    }
}

document.getElementById("upload_file")?.addEventListener("click", () => addFile());
document.getElementById("refresh")?.addEventListener("click", () => displayFile());