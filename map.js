let df_trend;
let geo_names = [];
let values = [];




function convertIso2ToIso3(iso2) {
    const iso2ToIso3 = {
        'AD': 'AND',
        'AE': 'ARE',
        'AF': 'AFG',
        'AG': 'ATG',
        'AI': 'AIA',
        'AL': 'ALB',
        'AM': 'ARM',
        'AO': 'AGO',
        'AQ': 'ATA',
        'AR': 'ARG',
        'AS': 'ASM',
        'AT': 'AUT',
        'AU': 'AUS',
        'AW': 'ABW',
        'AX': 'ALA',
        'AZ': 'AZE',
        'BA': 'BIH',
        'BB': 'BRB',
        'BD': 'BGD',
        'BE': 'BEL',
        'BF': 'BFA',
        'BG': 'BGR',
        'BH': 'BHR',
        'BI': 'BDI',
        'BJ': 'BEN',
        'BL': 'BLM',
        'BM': 'BMU',
        'BN': 'BRN',
        'BO': 'BOL',
        'BQ': 'BES',
        'BR': 'BRA',
        'BS': 'BHS',
        'BT': 'BTN',
        'BV': 'BVT',
        'BW': 'BWA',
        'BY': 'BLR',
        'BZ': 'BLZ',
        'CA': 'CAN',
        'CC': 'CCK',
        'CD': 'COD',
        'CF': 'CAF',
        'CG': 'COG',
        'CH': 'CHE',
        'CI': 'CIV',
        'CK': 'COK',
        'CL': 'CHL',
        'CM': 'CMR',
        'CN': 'CHN',
        'CO': 'COL',
        'CR': 'CRI',
        'CU': 'CUB',
        'CV': 'CPV',
        'CW': 'CUW',
        'CX': 'CXR',
        'CY': 'CYP',
        'CZ': 'CZE',
        'DE': 'DEU',
        'DJ': 'DJI',
        'DK': 'DNK',
        'DM': 'DMA',
        'DO': 'DOM',
        'DZ': 'DZA',
        'EC': 'ECU',
        'EE': 'EST',
        'EG': 'EGY',
        'EH': 'ESH',
        'ER': 'ERI',
        'ES': 'ESP',
        'ET': 'ETH',
        'FI': 'FIN',
        'FJ': 'FJI',
        'FK': 'FLK',
        'FM': 'FSM',
        'FO': 'FRO',
        'FR': 'FRA',
        'GA': 'GAB',
        'GB': 'GBR',
        'GD': 'GRD',
        'GE': 'GEO',
        'GF': 'GUF',
        'GG': 'GGY',
        'GH': 'GHA',
        'GI': 'GIB',
        'GL': 'GRL',
        'GM': 'GMB',
        'GN': 'GIN',
        'GP': 'GLP',
        'GQ': 'GNQ',
        'GR': 'GRC',
        'GS': 'SGS',
        'GT': 'GTM',
        'GU': 'GUM',
        'GW': 'GNB',
    };
    return iso2ToIso3[iso2];
}
async function getData(topic, region = '') {
    try {
        // Make an HTTP request to a local server
        const response = await fetch(`http://localhost:8000/getInterest?query=${topic}&region=${region}&resolution=WORLD&from_date=2022-01-01&to_date=2023-04-30`);

        // Convert the response data to JSON format
        df_trend = await response.json();

        // Reset the arrays
        geo_names = [];
        values = [];

        // Push the data into the arrays geo_names and values 
        for (const [name, value] of df_trend) {

            geo_names.push(name);
            values.push(value);
        }
        geo_names = geo_names.map(convertIso2ToIso3);
        console.log(geo_names[5]);

    } catch (error) {
        // If an error occurs, log it to the console
        console.error(error);
    }
}




async function map() {
    let topic = document.getElementById("topic").value;
    await getData(topic)

    // Create the Plotly figure with a choropleth map
    var figure = {
        data: [{
            type: 'choropleth',
            locationmode: 'ISO-3',
            locations: geo_names,
            z: values,
            colorscale: 'Blugrnyl',

            colorbar: { title: 'Trend analysis' }
        }],
        layout: {
            geo: {
                scope: '',
                showlakes: true,
          
            },
            height: 500, // set the height to 500 pixels
            width: 800 // set the width to 800 pixels
        }
    };
    
    // Set displayModeBar to false to remove the mode bar
    var config = {displayModeBar: false};

    // Display the Plotly figure
    Plotly.newPlot('plot', figure, config);
}




// Add an event listener to the text box element
const textbox = document.getElementById("topic");
textbox.addEventListener("input", map);


map()