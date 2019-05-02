'use strict'


function createReturnEdge() {


    return {

        getType() {
            return "EDGE"
        },

        getSpecificType() {
            return "RETURNEDGE"
        },

    }
}
