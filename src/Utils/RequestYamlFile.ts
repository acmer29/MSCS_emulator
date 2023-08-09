import { parse } from "yaml";

export async function requestYamlFile(path: string): Promise<any> { 
    return new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200){
                    resolve(parse(xhr.responseText));                    
                } else {
                    reject(new Error('Error status: ' + xhr.statusText));
                }
            }
        };
        xhr.send();
    });
}