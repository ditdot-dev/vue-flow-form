export class MaskToken {
    token : string;
    pattern? : RegExp;
    transform? : Function;
    escape? : boolean;
    optional? : boolean;
}

const defaultTokens : MaskToken[]= [
    {
        token: '#',
        pattern: /\d/
    },
    {
        token: 'X',
        pattern: /[0-9a-zA-Z]/
    },
    {
        token: 'S',
        pattern: /[a-zA-Z]/
    },
    {
        token: 'A',
        pattern: /[a-zA-Z]/,
        transform: (v: string) => v.toLocaleUpperCase()
    },
    {
        token: 'a',
        pattern: /[a-zA-Z]/,
        transform: (v: string) => v.toLocaleLowerCase()
    },
    {
        token: '!',
        escape: true
    },
]


export class MaskModel{
    tokens : MaskToken[];
    
    constructor(MaskTokens? : MaskToken[]){
        if(MaskTokens == null)
            this.tokens = defaultTokens;
        else
            this.tokens = defaultTokens.concat(MaskTokens)
    }

    public Build() {
        var tokens : any = {}

        this.tokens.forEach(t => {
            tokens[t.token] = {
                pattern : t.pattern,
                transform : t.transform,
                escape : t.escape,
                optional : t.optional
            }
        });

        return tokens;
    }
}