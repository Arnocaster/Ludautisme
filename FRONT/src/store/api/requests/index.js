/* eslint-disable array-callback-return */
//Ici aggrégation des différents enpoints des fichiers requests
import { adminUsers } from "./adminUsers";
import { adminReferences } from "./adminReferences";

export const initEndpoints = (builder) =>{

    //REFERENCEMENT DE NOUVELLES LIBRAIRIES API
    const endpointsLibs = [adminUsers,adminReferences];
    
    //On lit chaque librairie de requete, si stucture ok on le rajoute au endpoints
    //Chaque hook de requete doit être unique
    //sinon on le signale en erreur et on rajoute un retour d'erreur sans bloquer l'exécution

    //Tableau des champs systemes de l'api ne pouvant être mis à jour
    const sysFields = ['id','created_at'];
    const cleanPayload = (body) => {
        const cleanedArr = Object.entries(body).filter((prop)=> !sysFields.includes(prop[0]));
        const cleanedBody =  cleanedArr.reduce(
                                (prev,curr)=>{const newProp = {[curr[0]]:curr[1]} ;
                                              return {...prev,...newProp}
                                            },{});
        console.log(cleanedBody);
        return cleanedBody;
    }
    //On gère les différents dypes de requetes d'une api REST
    const buildRequest = (endpoint) => {
        const reqs ={
                get     : builder.query({query : endpoint.query}),
                post    : builder.mutation({    
                                                query: (payload) => ({
                                                    url:`${endpoint.query}${(payload.param)?payload.param:''}`,
                                                    method: 'POST',
                                                    body: payload.body,
                                                }),
                                                //invalidatesTags: ['Post'],
                                            }),
                put     : builder.mutation({    query: (payload) => ({
                                                    url:`${endpoint.query}${(payload.param)?payload.param:''}`,
                                                    method: 'PUT',
                                                    body: cleanPayload(payload.body),
                                                }),
                                                //invalidatesTags: ['Post'],
                                                }),
                delete  : builder.mutation({    query: (payload,param) => ({
                                                    url:`${endpoint.query}${(param)?param:''}`,
                                                    method: 'DELETE',
                                                    body: payload,
                                                }),
                                                //invalidatesTags: ['Post'],
                                            }),
            }
        return (endpoint.type) ? reqs[endpoint.type.toLowerCase()] : reqs.get
    }
    
    //Objet contenant toutes les requetes rempli par la fonction synchrone requestLib.map
    //Mutation ici
    let endpoints = {};
    
    //Le .map ajoute les requetes ok a apiEndpoints, rajoute aussi les requêtes pas ok avec message d'erreur redux
    //errors Récupère seulement les endpoints en erreur pour affichage console a l'initialisation
    //Pour toutes les librairies de requetes
    const errors = endpointsLibs.map(endpointLib => {
        //On contrôle si les propriétés sont valides
        return Object.keys(endpointLib).map(endpointName => {
           
            // if (   typeof endpointLib[endpointName] === 'function'  //Si ok on les ajoute a endpoints
            //     && typeof endpointLib[endpointName]() === 'string'){
                endpoints = {...endpoints, ...{[endpointName] : buildRequest(endpointLib[endpointName])} };
            // }
            //Sinon on retourne une erreur
            // else {
            //     return `Redux[RequestError] : ${endpointName} n'est pas une fonction ou ne retourne pas une chaine de caractère`;
            // }       
        })
        .filter(elt => elt); // Filtre Object.keys().map pour supprimer les undefined retourné si requete ok
    });
    console.log('endpoints',endpoints);
    (errors.length) && console.error('Redux[RequestError] :',errors.flat());
    return endpoints
}
