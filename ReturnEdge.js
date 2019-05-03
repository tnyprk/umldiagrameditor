'use strict'


function createReturnEdge() {
    let start
    let end

    return {
        connect(s, e) {
            start = s
            end = e
          },
        getType() {
            return "EDGE"
        },

        getSpecificType() {
            return "RETURNEDGE"
        },
        draw(){}

    }
}
