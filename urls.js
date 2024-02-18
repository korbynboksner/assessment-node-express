const lineReader = require('line-reader'); 
const fs = require('fs');
const axios = require('axios');
const process = require('process');

async function cat(file){
    lineReader.eachLine(`${file}`, async (line, last) => { 
        let domain = (new URL(line))
        domain = domain.hostname
        console.log(domain)
        fish(line, domain)

});
}

async function fish(url, domain){
    try {
        let response = await axios.get(url)

        await fs.writeFile(domain, response.data, 'utf8', function(err){
            if (err) {
                console.error(err);
    
                process.exit(1)
            }
    
        })    

    } catch(err){
        console.error(err)
    }
}
console.log(process.argv[2])
cat(process.argv[2]);