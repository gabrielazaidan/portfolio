document.addEventListener("DOMContentLoaded", function () {
    iniciarMenu();
    iniciarTema();
    iniciarFiltros();
    iniciarEmail();
});

function iniciarMenu() {
    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");
    const links = menu.querySelectorAll("a");

    function alternarMenu() {
        const estaAberto = menu.classList.toggle("aberto");
        document.body.classList.toggle("menu-aberto", estaAberto);
        botaoMenu.setAttribute("aria-expanded", estaAberto);
    }

    function fecharMenu() {
        menu.classList.remove("aberto");
        document.body.classList.remove("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    }

    botaoMenu.addEventListener("click", alternarMenu);

    links.forEach(function (link) {
        link.addEventListener("click", fecharMenu);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 700) {
            fecharMenu();
        }
    });
}

function iniciarTema() {
    const botaoTema = document.getElementById("botao-tema");

    function atualizarIcone() {
        const escuro = document.body.classList.contains("tema-escuro");
        botaoTema.textContent = escuro ? "☀" : "☾";
    }

    try {
        if (localStorage.getItem("tema") === "escuro") {
            document.body.classList.add("tema-escuro");
        }
    } catch (erro) {}

    atualizarIcone();

    botaoTema.addEventListener("click", function () {
        const escuro = document.body.classList.toggle("tema-escuro");

        try {
            localStorage.setItem("tema", escuro ? "escuro" : "claro");
        } catch (erro) {}

        atualizarIcone();
    });
}

function iniciarFiltros() {
    const botoes = document.querySelectorAll("#filtros-hobbies button");
    const hobbies = document.querySelectorAll(".hobby");
    const grade = document.querySelector(".grade-hobbies");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const filtro = botao.dataset.filtro;

            botoes.forEach(function (b) {
                b.classList.remove("ativo");
            });
            botao.classList.add("ativo");

            hobbies.forEach(function (hobby) {
                const categoria = hobby.dataset.categoria;
                const deveMostrar = filtro === "todos" || categoria === filtro;
                hobby.classList.toggle("oculto", !deveMostrar);
            });

            grade.classList.toggle("filtrada", filtro !== "todos");
        });
    });
}

function iniciarEmail() {
    const botaoEmail = document.getElementById("botao-email");
    const email = botaoEmail.dataset.email;
    const textoEmail = botaoEmail.querySelector("strong");
    const seta = botaoEmail.querySelector(".seta");

    const textoOriginal = textoEmail.textContent;
    const setaOriginal = seta.textContent;

    function mostrarAviso() {
        textoEmail.textContent = "Copiado!";
        seta.textContent = "✓";

        setTimeout(function () {
            textoEmail.textContent = textoOriginal;
            seta.textContent = setaOriginal;
        }, 2000);
    }

    function copiarPlanoB() {
        const campo = document.createElement("textarea");
        campo.value = email;
        document.body.appendChild(campo);
        campo.select();
        document.execCommand("copy");
        document.body.removeChild(campo);
        mostrarAviso();
    }

    botaoEmail.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(mostrarAviso).catch(copiarPlanoB);
        } else {
            copiarPlanoB();
        }
    });
}