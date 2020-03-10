class progressBar extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode :'open'});
        this._complete = 0;
    }

    get complete(){
        return this._complete;
    }

    set complete(val){
        this.setAttribute('complete', val);
    }
    static get observedAttributes(){
        return ['complete']
    }

    attributeChangedCallback(attr, oldVal, newVal){
        var el = this.shadow.querySelector('.inner-container');
        switch (attr){
            case 'complete' :
                this._complete = parseInt(newVal,10) || 0;
                el.style.width = this.complete + '%';
                el.innerHTML = this.complete + '%';
         }
    }

    connectedCallback(){
        var template = `
        <style>
        .outer-container {
            height : 30px;
            width : 50%;
            background-color : gray;
            border-radius : 5px;
        }
        .inner-container {
            color : white;
            height : 100%;
            line-height : 30px;
            background : blue;
            text-align : center;
            border-radius : 5px;
            transition : width 0.25s
        }
        </style>
                        <div class='outer-container'>
                            <div class='inner-container'>${this.complete}</div>
                        </div>
        `;
        this.shadow.innerHTML = template;

    }
}

customElements.define('progress-bar', progressBar);