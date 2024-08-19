//Knight ou Sorcerer
//LittleMonster ou BigMonster

class Character {
    
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life (newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 14;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

//Cenário do jogo

class Stage {
    //Definindo quem serão os lutadores e os elementos que representam eles na tela
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    //Iniciando o jogo
    start() {
        this.update();

        //Adicionando o evento de clique no botão de ataque
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    //Atualizando a tela com as informações dos lutadores
    update() {
        //Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        //Calculando a porcentagem de vida do lutador 1
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        //Fighter2
        this.fighter2El.querySelector('.name').innerHTML =`${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        //Calculando a porcentagem de vida do lutador 2
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }   

    //Função de ataque
    doAttack(attacking, attacked) {
        //Verificando se o atacante ou atacado já está morto
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('O atacante ou atacado já está morto');
            return;
        }

        //Calculando o dano do ataque
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        //Calculando o dano real do ataque
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        //Verificando se o ataque foi bem sucedido
        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} atacou ${attacked.name} com ${actualAttack.toFixed(2)} de dano!`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender-se do ataque de ${attacking.name}...`);
        }

        //Exibindo mensagem de morte
        if(attacked.life <= 0) {
            console.log(`${attacked.name} morreu!`);
        }

        this.update();
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        //Adicionando a mensagem na lista
        this.list.unshift(msg);

        //Renderizando a lista completa
        this.render();
    }

    render(){
        //Limpando a lista
        this.listEl.innerHTML = '';

        //Adicionando os itens na lista
        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }

}