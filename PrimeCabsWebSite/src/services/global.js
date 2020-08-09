import {createHashHistory} from 'history';

const history = createHashHistory();

export function reloadWindow() {
    window.location.reload(true);
}

export function navigate(route, searchParams) {
    /*let path = '/'; // change to 404 page route

     /!*if (route === 'getyourtaxi') {
     history.push('/getyourtaxi');
     }*!/
     switch (route){
     case "getyourtaxi":
     history.push('/getyourtaxi');
     break;
     case "ourtourpackages":
     history.push('/ourtourpackages');
     break;
     default:
     history.push('/');
     }*/
    /*history.push({
     pathname: path,
     search: searchParams
     });*/
}

export function navigations(route, params) {

        history.push({
            pathname: route,
            search_data: params
        })

}