import React, { useReducer } from 'react';


export default ( reducer, actions, initialState) => {
    
    //resource - for each resource one context is created
    const Context = React.createContext();
    
    //provider function
    const Provider = ({ children }) => {
        
        const [state, dispatch] = useReducer( reducer, initialState );


        //actions === {addBlogPost: (dispatch) => {return () => {}}}

        const boundActions = {};
        for( let key in actions){
            boundActions[key] = actions[key](dispatch);
        }


        //Each time we are returing current state object as value prop
        return <Context.Provider value={{state, ...boundActions}}>
            {children}
        </Context.Provider>

    }

    return { Context, Provider };

};