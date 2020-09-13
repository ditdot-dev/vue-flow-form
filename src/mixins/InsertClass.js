/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

 // Mixin that inserts a new CSS class into the language model string to format the :key  
export const InsertClass = {
    methods: {
        insertClass(value) {
            if (!value) return ''
            let stringArr = value.toString().split(" ")
            for (let i = 0; i < stringArr.length; i++) {
                if (stringArr[i].slice(0,4) === ":key") {
                    stringArr[i] = '<span class="f-language-key">' + stringArr[i].substring(5, stringArr[i].length - 1) + '</span>'
                }
            }
            return stringArr.join(" ")
        } 
    }
}