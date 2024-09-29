///<reference types="Cypress" />

const URL = "192.168.0.106:8080";

context("Memotest", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("se asegura que hayan 12 imagenes en el cuadro de juego", () => {
    cy.get("#cuadro-juego").find("img").should("have.length", 12);
  });

  it("se asegura que las imagenes no sean visibles al cargar la pagina", () => {
    cy.get("#cuadro-juego").find("img").should("not.be.visible");
  });

  it("se asegura que el cronometro este detenido al cargar la pagina", () => {
    cy.wait(2000);
    cy.get("#segundos").should("have.text", "00");
  });

  it("se asegura que el boton de comenzar juego sea visible al cargar la pagina", () => {
    cy.get("#comenzar-juego").should("be.visible");
  });

  it("se asegura que las posiciones de las imagenes sean aleatorias", () => {
    cy.get("#cuadro-juego")
      .find("img")
      .then((imagenes) => {
        let imagenesOriginales = [];
        imagenes.each(function (i, imagen) {
          imagenesOriginales.push(imagen.name);
        });

        cy.visit(URL);

        let imagenesNuevas = [];
        cy.get("#cuadro-juego")
          .find("img")
          .then((imagenesNuevas) => {
            imagenesNuevas.each(function (i, imagen) {
              imagenesNuevas.push(imagen.name);
            });
            cy.wrap(imagenesOriginales).should(
              "not.deep.equal",
              imagenesNuevas
            );
          });
      });
  });

  describe("ejecuta las pruebas de una seleccion erronea", () => {
    let mapaDePares, listaDePares;
  
    beforeEach(() => {
      cy.get('#comenzar-juego').click(); // Comienza el juego antes de cada prueba
      cy.get('img').then(cuadros => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
      });
    });
  
    it('se asegura que eligiendo una combinacion erronea las imagenes se vuelvan a ocultar', () => {
      listaDePares[0][0].click();
      listaDePares[1][0].click();
      cy.get("#cuadro-juego").find("img.invisible").should("have.length", 12);
    });
  
    it('se asegura que eligiendo una combinacion erronea aparezca el indicador de errores', () => {
      listaDePares[0][0].click();
      listaDePares[1][0].click();
      cy.get("#errores-cometidos").should("be.visible");
    });
  
    it('se asegura que eligiendo una combinacion erronea el indicador de errores valga 1', () => {
      listaDePares[0][0].click();
      listaDePares[1][0].click();
      cy.get("#errores-cometidos").should('have.text', 'Errores cometidos: 1');
    });
  
    it('se asegura que eligiendo una combinacion correcta las imagenes queden visibles', () => {
      listaDePares[0][0].click();
      listaDePares[0][1].click();
      cy.wait(2000);
      cy.get("#cuadro-juego").find("img.invisible").should("have.length", 10);
    });
  });
  describe("ejecuta las pruebas de una seleccion correcta", () => {
    let mapaDePares, listaDePares;
  
    beforeEach(() => {
      cy.get('#comenzar-juego').click();
      cy.get('img').then(cuadros => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
      });
    });
  
    it('se asegura que eligiendo una combinacion correcta las imagenes queden visibles', () => {
      listaDePares[0][0].click();
      listaDePares[0][1].click();
      cy.wait(2000);
      cy.get("#cuadro-juego").find("img.invisible").should("have.length", 10);
    });
  });

  describe("resuelve el juego", () => {
    it('se asegura que al elegir todas las imagenes correctas aparezca el mensaje ganador', () => {
    let mapaDePares, listaDePares;
      cy.get('#comenzar-juego').click();
      cy.get('img').then(cuadros => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);
        listaDePares[0][0].click();
        listaDePares[0][1].click();
        listaDePares[1][0].click();
        listaDePares[1][1].click();
        listaDePares[2][0].click();
        listaDePares[2][1].click();
        listaDePares[3][0].click();
        listaDePares[3][1].click();
        listaDePares[4][0].click();
        listaDePares[4][1].click();
        listaDePares[5][0].click();
        listaDePares[5][1].click();
        cy.get("body").find("#mensaje-ganador").should("be.visible");
    });
  });
  });
  });


function obtenerParesDeCuadros(cuadros) {
  const pares = {};
  cuadros.each((i, cuadro) => {
    const nombreCuadro = cuadro.name;

    if (pares[nombreCuadro]) {
      pares[nombreCuadro].push(cuadro);
    } else {
      pares[nombreCuadro] = [cuadro];
    }
  });
  console.log(pares);
  return pares;
}
