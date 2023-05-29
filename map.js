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
        'GY': 'GUY',
        'HK': 'HKG',
        'HM': 'HMD',
        'HN': 'HND',
        'HR': 'HRV',
        'HT': 'HTI',
        'HU': 'HUN',
        'ID': 'IDN',
        'IE': 'IRL',
        'IL': 'ISR',
        'IM': 'IMN',
        'IN': 'IND',
        'IO': 'IOT',
        'IQ': 'IRQ',
        'IR': 'IRN',
        'IS': 'ISL',
        'IT': 'ITA',
        'JE': 'JEY',
        'JM': 'JAM',
        'JO': 'JOR',
        'JP': 'JPN',
        'KE': 'KEN',
        'KG': 'KGZ',
        'KH': 'KHM',
        'KI': 'KIR',
        'KM': 'COM',
        'KN': 'KNA',
        'KP': 'PRK',
        'KR': 'KOR',
        'KW': 'KWT',
        'KY': 'CYM',
        'KZ': 'KAZ',
        'LA': 'LAO',
        'LB': 'LBN',
        'LC': 'LCA',
        'LI': 'LIE',
        'LK': 'LKA',
        'LR': 'LBR',
        'LS': 'LSO',
        'LT': 'LTU',
        'LU': 'LUX',
        'LV': 'LVA',
        'LY': 'LBY',
        'MA': 'MAR',
        'MC': 'MCO',
        'MD': 'MDA',
        'ME': 'MNE',
        'MF': 'MAF',
        'MG': 'MDG',
        'MH': 'MHL',
        'MK': 'MKD',
        'ML': 'MLI',
        'MM': 'MMR',
        'MN': 'MNG',
        'MO': 'MAC',
        'MP': 'MNP',
        'MQ': 'MTQ',
        'MR': 'MRT',
        'MS': 'MSR',
        'MT': 'MLT',
        'MU': 'MUS',
        'MV': 'MDV',
        'MW': 'MWI',
        'MX': 'MEX',
        'MY': 'MYS',
        'MZ': 'MOZ',
        'NA': 'NAM',
        'NC': 'NCL',
        'NE': 'NER',
        'NF': 'NFK',
        'NG': 'NGA',
        'NI': 'NIC',
        'NL': 'NLD',
        'NO': 'NOR',
        'NP': 'NPL',
        'NR': 'NRU',
        'NU': 'NIU',
        'NZ': 'NZL',
        'OM': 'OMN',
        'PA': 'PAN',
        'PE': 'PER',
        'PF': 'PYF',
        'PG': 'PNG',
        'PH': 'PHL',
        'PK': 'PAK',
        'PL': 'POL',
        'PM': 'SPM',
        'PN': 'PCN',
        'PR': 'PRI',
        'PS': 'PSE',
        'PT': 'PRT',
        'PW': 'PLW',
        'PY': 'PRY',
        'QA': 'QAT',
        'RE': 'REU',
        'RO': 'ROU',
        'RS': 'SRB',
        'MR': 'MRT',
        'MS': 'MSR',
        'MT': 'MLT',
        'MU': 'MUS',
        'MV': 'MDV',
        'MW': 'MWI',
        'MX': 'MEX',
        'MY': 'MYS',
        'MZ': 'MOZ',
        'NA': 'NAM',
        'NC': 'NCL',
        'NE': 'NER',
        'NF': 'NFK',
        'NG': 'NGA',
        'NI': 'NIC',
        'NL': 'NLD',
        'NO': 'NOR',
        'NP': 'NPL',
        'NR': 'NRU',
        'NU': 'NIU',
        'NZ': 'NZL',
        'OM': 'OMN',
        'PA': 'PAN',
        'PE': 'PER',
        'PF': 'PYF',
        'PG': 'PNG',
        'PH': 'PHL',
        'PK': 'PAK',
        'PL': 'POL',
        'PM': 'SPM',
        'PN': 'PCN',
        'PR': 'PRI',
        'PS': 'PSE',
        'PT': 'PRT',
        'PW': 'PLW',
        'PY': 'PRY',
        'QA': 'QAT',
        'RE': 'REU',
        'RO': 'ROU',
        'RS': 'SRB',
        'RU': 'RUS',
        'RW': 'RWA',
        'SA': 'SAU',
        'SB': 'SLB',
        'SC': 'SYC',
        'SD': 'SDN',
        'SE': 'SWE',
        'SG': 'SGP',
        'SH': 'SHN',
        'SI': 'SVN',
        'SJ': 'SJM',
        'SK': 'SVK',
        'SL': 'SLE',
        'SM': 'SMR',
        'SN': 'SEN',
        'SO': 'SOM',
        'SR': 'SUR',
        'SS': 'SSD',
        'ST': 'STP',
        'SV': 'SLV',
        'SX': 'SXM',
        'SY': 'SYR',
        'SZ': 'SWZ',
        'TC': 'TCA',
        'TD': 'TCD',
        'TF': 'ATF',
        'TG': 'TGO',
        'TH': 'THA',
        'TJ': 'TJK',
        'TK': 'TKL',
        'TL': 'TLS',
        'TM': 'TKM',
        'TN': 'TUN',
        'TO': 'TON',
        'TR': 'TUR',
        'TT': 'TTO',
        'TV': 'TUV',
        'TW': 'TWN',
        'TZ': 'TZA',
        'UA': 'UKR',
        'UG': 'UGA',
        'UM': 'UMI',
        'US': 'USA',
        'UY': 'URY',
        'UZ': 'UZB',
        'VA': 'VAT',
        'VC': 'VCT',
        'VE': 'VEN',
        'VG': 'VGB',
        'VI': 'VIR',
        'VN': 'VNM',
        'VU': 'VUT',
        'WF': 'WLF',
        'WS': 'WSM',
        'YE': 'YEM',
        'YT': 'MYT',
        'ZA': 'ZAF',
    };
    return iso2ToIso3[iso2];
}



async function getData(topic, from_date, to_date, region = '', resolution = 'WORLD') {
    try {
        // Show the loading bar
        const loadingCicrle = document.getElementById("loading-map");
        loadingCicrle.style.display = "block";


        // Simulate the loading process with setTimeout
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Make an HTTP request to a local server
        const response = await fetch(`http://localhost:8000/google_trend?query=${topic}&region=${region}&resolution=${resolution}&from_date=${from_date}&to_date=${to_date}`);

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
    } finally {

        const loadingCicrle = document.getElementById("loading-map");
        loadingCicrle.style.display = "none";
    }
}

export async function map() {
    let topic = document.getElementById("topic").value;
    let from_date = document.getElementById("from").value;
    let to_date = document.getElementById("to").value;

    await getData(topic, from_date, to_date)

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
    var config = { displayModeBar: false };

    // Display the Plotly figure
    Plotly.newPlot('map', figure, config);
}




