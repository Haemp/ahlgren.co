

export default class ClientState {
    static getViewMode(){
        if(document.documentElement.clientWidth > 550){
            return ClientState.MODE_BIG;
        }else{
            return ClientState.MODE_SMALL;
        }
    }

    static getViewHeight(){
        return document.documentElement.clientHeight;
    }

    static getViewModeClass(){
        return `ah-ahlgren__view-mode-${ClientState.getViewMode()}`;
    }
}

ClientState.MODE_BIG = 'big';
ClientState.MODE_SMALL = 'small';