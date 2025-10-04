const iframe = document.getElementById("iframe");

async function getPic() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        const data = await response.json();
        // console.log("return：\n", data);
        return data;

    } catch (error) {
        console.error("Err：\n", error);
        return -1;
    }
}

async function main() {
    getPic()
        .then(res => res[0].url)
        .then(responseUrl => {
            console.info(responseUrl);
            iframe.src = responseUrl;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});