// If other yung value ni barangay and municipality ang gawin sa back end is kunin lang directly yung address other wise pagdugtungin 
// yung barangay municipality bulacan
const municipality = document.querySelector('#municipality');
const barangay = document.querySelector('#barangay');


const municipalityList = ['angat', 'balagtas', 'baliwag', 'bocaue', 'bulakan', 'bustos', 'calumpit', 'doña remedios trinidad', 'guiguinto', 'hagonoy', 'malolos', 'marilao', 
'meycauayan', 'norzagaray', 'obando', 'pandi', 'paombong', 'plaridel', 'pulilan', 'san ildefonso', 'san jose del monte', 'san miguel', 'san rafael', 'santa maria', 'other'];

const barangaylist = {
    'angat': [
      'banaban', 'baybay', 'binagbag', 'donacion', 'encanto', 'laog', 'marungko',
      'niugan', 'paltok', 'pulong yantok', 'san roque', 'santa cruz', 'santa lucia',
      'santo cristo', 'sulucan', 'taboc'
    ],
    'balagtas': [
      'borol 1st', 'borol 2nd', 'dalig', 'longos', 'panginay', 'pulong gubat',
      'san juan', 'santol', 'wawa'
    ],
    'baliwag': [
      'bagong nayon', 'barangca', 'calantipay', 'catulinan', 'concepcion',
      'hinukay', 'makinabang', 'matangtubig', 'pagala', 'paitan', 'piel',
      'pinagbarilan', 'poblacion', 'sabang', 'san jose', 'san roque',
      'santa barbara', 'santo cristo', 'santo niño', 'subic', 'sulivan',
      'tangos', 'tarcan', 'tiaong', 'tibag', 'tilapayong', 'virgen delas flores'
    ],
    'bocaue': [
      'antipona', 'bagumbayan', 'bambang', 'batia', 'biñang 1st', 'biñang 2nd',
      'bolacan', 'bundukan', 'bunlo', 'caingin', 'duhat', 'igulot', 'lolomboy',
      'poblacion', 'sulucan', 'taal', 'tambobong', 'turo', 'wakas'
    ],
    'bulakan': [
      'bagumbayan', 'balubad', 'bambang', 'matungao', 'maysantol', 'perez',
      'pitpitan', 'san francisco', 'san jose', 'san nicolas', 'santa ana',
      'santa ines', 'taliptip', 'tibig'
    ],
    'bustos': [
      'bonga mayor', 'bonga menor', 'buisan', 'camachilihan', 'cambaog',
      'catacte', 'liciada', 'malamig', 'malawak', 'poblacion',
      'san pedro', 'talampas', 'tanawan', 'tibagan'
    ],
    'calumpit': [
      'balite', 'balungao', 'buguion', 'bulusan', 'calizon',
      'calumpang', 'caniogan', 'corazon', 'frances', 'gatbuca',
      'gugo', 'iba este', 'iba o este', 'longos', 'meysulao',
      'meyto', 'palimbang', 'panducot', 'pio cruzcosa', 'poblacion',
      'pungo', 'san jose', 'san marcos', 'san miguel', 'santa lucia',
      'santo niño', 'sapang bayan', 'sergio bayan', 'sucol'
    ],
    'doña remedios trinidad': [
      'bayabas', 'camachile', 'camachin', 'kabayunan', 'kalawakan',
      'pulong sampalok', 'sapang bulak', 'talbak'
    ],
    'guiguinto': [
      'cutcut', 'daungan', 'ilang-ilang', 'malis', 'panginay',
      'poblacion', 'pritil', 'pulong gubat', 'santa cruz', 'santa rita',
      'tabang', 'tabe', 'tiaong', 'tuktukan'
    ],
    'hagonoy': [
      'abulalas', 'carillo', 'iba', 'iba-ibayo', 'mercado',
      'palapat', 'pugad', 'sagrada familia', 'san agustin', 'san isidro',
      'san jose', 'san juan', 'san miguel', 'san nicolas', 'san pablo',
      'san pascual', 'san pedro', 'san roque', 'san sebastian', 'santa cruz',
      'santa elena', 'santa monica', 'santo niño', 'santo rosario', 'tampok',
      'tibaguin'
    ],
    'malolos': [
      'anilao', 'atlag', 'babatnin', 'bagna', 'bagong bayan',
      'balayong', 'balite', 'bangkal', 'barihan', 'bulihan',
      'bungahan', 'caingin', 'calero', 'caliligawan', 'canalate',
      'caniogan', 'catmon', 'cofradia', 'dakila', 'guinhawa',
      'ligas', 'liyang', 'longos', 'look 1st', 'look 2nd',
      'lugam', 'mabolo', 'mambog', 'masile', 'matimbo',
      'mojon', 'namayan', 'niugan', 'pamarawan', 'panasahan',
      'pinagbakahan', 'san agustin', 'san gabriel', 'san juan', 'san pablo',
      'san vicente', 'santiago', 'santisima trinidad', 'santo cristo', 'santo niño',
      'santo rosario', 'santol', 'sumapang bata', 'sumapang matanda', 'taal',
      'tikay'
    ],
    'marilao': [
      'abangan norte', 'abangan sur', 'ibayo', 'lambakin', 'lias',
      'loma de gato', 'nagbalon', 'patubig', 'poblacion I', 'poblacion II',
      'prenza I', 'prenza II', 'santa rosa I', 'santa rosa II', 'saog',
      'tabing ilog'
    ],
    'meycauayan': [
      'bagbaguin', 'bahay pare', 'bancal', 'banga', 'bayugo',
      'caingin', 'calvario', 'camalig', 'hulo', 'iba',
      'langka', 'lawa', 'libtong', 'liputan', 'longos',
      'malhacan', 'pajo', 'pandayan', 'pantoc', 'perez',
      'poblacion', 'saint francis', 'saluysoy', 'tugatog', 'ubihan',
      'zamora'
    ],
    'norzagaray': [
      'bangkal', 'baraka', 'bigte', 'bitungol', 'friendship village resources',
      'matictic', 'minuyan', 'partida', 'pinagtulayan', 'poblacion',
      'san lorenzo', 'san mateo', 'tigbe'
    ],
    'obando': [
      'binuangan', 'catanghalan', 'hulo', 'lawa', 'paco',
      'pag-asa', 'paliwas', 'panghulo', 'salambao', 'san pascual',
      'tawiran'
    ],
    'pandi': [
      'bagbaguin', 'bagong barrio', 'baka-bakahan', 'bunsuran I', 'bunsuran II', 'bunsuran III',
      'cacarong bata', 'cacarong matanda', 'cupang', 'malibong bata', 'malibong matanda',
      'manatal', 'mapulang lupa', 'masagana', 'masuso', 'pinagkuartelan', 'poblacion',
      'real de cacarong', 'san roque', 'santo niño', 'siling bata', 'siling matanda'
    ],
    'paombong': [
      'binakod', 'kapitangan', 'malumot', 'masukol', 'pinalagdan', 'poblacion', 'san isidro I',
      'san isidro II', 'san jose', 'san roque', 'san vicente', 'santa cruz', 'santo niño', 'santo rosario'
    ],
    'plaridel': [
      'agnaya', 'bagong silang', 'banga I', 'banga II', 'bintog', 'bulihan', 'culianin',
      'dampol', 'lagundi', 'lalangan', 'lumang bayan', 'parulan', 'poblacion', 'rueda',
      'san jose', 'santa ines', 'santo niño', 'sipat', 'tabang'
    ],
    'pulilan': [
      'balatong A', 'balatong B', 'cutcot', 'dampol I', 'dampol II-A', 'dampol II-B', 'dulong malabon',
      'inaon', 'longos', 'lumbac', 'paltao', 'penabatan', 'poblacion', 'santa peregrina', 'santo cristo',
      'taal', 'tabon', 'tibag', 'tinejero'
    ],
    'san ildefonso': [
      'akle', 'alagao', 'anyatam', 'bagong barrio', 'basuit', 'bubulong malaki', 'bubulong munti',
      'buhol na mangga', 'bulusukan', 'calasag', 'calawitan', 'casalat', 'gabihan', 'garlang',
      'lapnit', 'maasim', 'makapilapil', 'malipampang', 'mataas na parang', 'matimbubong',
      'nabaong garlang', 'palapala', 'pasong bangkal', 'pinaod', 'poblacion', 'pulong tamo',
      'san juan', 'santa catalina bata', 'santa catalina matanda', 'sapang dayap', 'sapang putik',
      'sapang putol', 'sumandig', 'telepatio', 'umpucan', 'upig'
    ],
    'san jose del monte': [
      'assumption','bagong buhay', 'bagong buhay II', 'bagong buhay III', 'citrus', 'ciudad real',
      'dulong bayan', 'fatima', 'fatima II', 'fatima III', 'fatima IV', 'fatima V',
      'francisco homes-guijo', 'francisco homes-mulawin', 'francisco homes-narra',
      'francisco homes-yakal', 'gaya-gaya', 'graceville', 'gumaoc central', 'gumaoc east',
      'gumaoc west', 'kaybanban', 'kaypian', 'lawang pari', 'maharlika', 'minuyan',
      'minuyan II', 'minuyan III', 'minuyan IV', 'minuyan proper', 'minuyan V', 'muzon',
      'paradise III', 'poblacion', 'poblacion I', 'saint martin de porres', 'san isidro',
      'san manuel', 'san martin', 'san martin II', 'san martin III', 'san martin IV',
      'san pedro', 'san rafael', 'san rafael I', 'san rafael III', 'san rafael IV',
      'san rafael V', 'san roque', 'santa cruz', 'santa cruz II', 'santa cruz III',
      'santa cruz IV', 'santa cruz V', 'santo cristo', 'santo niño', 'santo niño II',
      'sapang palay', 'tungkong mangga'
    ],
    'san miguel': [
      'bagong pag-asa', 'bagong silang', 'balaong', 'balite', 'bantog', 'bardias',
      'baritan', 'batasan bata', 'batasan matanda', 'biak-na-bato', 'biclat', 'buga',
      'buliran', 'bulualto', 'calumpang', 'cambio', 'camias', 'ilog-bulo', 'king kabayo',
      'labne', 'lambakin', 'magmarale', 'malibay', 'maligaya', 'mandile', 'masalipit',
      'pacalag', 'paliwasan', 'partida', 'pinambaran', 'poblacion', 'pulong bayabas',
      'pulong duhat', 'sacdalan', 'salacot', 'salangan', 'san agustin', 'san jose',
      'san juan', 'san vicente', 'santa ines', 'santa lucia', 'santa rita bata',
      'santa rita matanda', 'sapang', 'sibul', 'tartaro', 'tibagan', 'tigpalas'
    ],
    'san rafael': [
      'bma-balagtas', 'banca-banca', 'caingin', 'capihan', 'coral na bato', 'cruz na daan',
      'dagat-dagatan', 'diliman I', 'diliman II', 'libis', 'lico', 'maasim', 'mabalas-balas',
      'maguinao', 'maronguillo', 'paco', 'pansumaloc', 'pantubig', 'pasong bangkal',
      'pasong callos', 'pasong intsik', 'pinacpinacan', 'poblacion', 'pulo',
      'pulong bayabas', 'salapungan', 'sampaloc', 'san agustin', 'san roque',
      'sapang pahalang', 'talacsan', 'tambubong', 'tukod', 'ulingao'
    ],
    'santa maria': [
      'bagbaguin', 'balasing', 'buenavista', 'bulac', 'camangyanan', 'catmon', 'cay pombo',
      'caysio', 'guyong', 'lalakhan', 'mag-asawang sapa', 'mahabang parang', 'manggahan',
      'parada', 'poblacion', 'pulong buhangin', 'san gabriel', 'san jose patag',
      'san vicente', 'santa clara', 'santa cruz', 'silangan', 'tabing bakod', 'tumana'
    ]
  };

// Populate the municipalities dropdown select
generateMunicipalities();


function getBarangayList(municipality){
    removeAllChildNodes(barangay);
    barangay.removeAttribute('disabled');
    document.querySelector('.other-container').style.display = 'none';
    try {
        document.querySelector('#barangay-other').remove();
        document.querySelector('#municipality-other').remove();
        document.querySelector('#province-other').remove();
    } catch (error) {
        
    }

    if(municipality == 'other'){



        barangay.setAttribute('disabled', 'disabled');

        let html =`
        <div class="location-container">
            <input type="text" name="province" id="provinceOther" placeholder="Province">
            <input type="text" name="municipality" id="municipalityOther" placeholder="Municipality">
            <input type="text" name="barangay" id="barangayOther" placeholder="Barangay">
        </div>`

        document.querySelector('.other-container').style.display = 'flex';
        document.querySelector('.other-container').innerHTML += html;
        return;
    }
    generateBarangays(municipality);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateBarangays(municipality){
    let barangayContainer = barangaylist[municipality];

    barangayContainer.forEach((item)=>{

        processedItem = item.substring(0, 1).toUpperCase() + item.substring(1);

        for(i = 0; i < item.length; i++){
            if(processedItem[i] == ' '){
                let splitStr = processedItem.split(' ');
                for (j = 0; j < splitStr.length; j++) {
                    splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);     
                }
                processedItem = splitStr.join(' ');
                break;
            }
        };

        let temp = document.createElement('option');
        temp.setAttribute('value', item);
        temp.innerHTML = processedItem;
        barangay.appendChild(temp);
    });
}

function generateMunicipalities(){
    municipalityList.forEach((item)=>{

        processedItem = item.substring(0, 1).toUpperCase() + item.substring(1);
    
        for(i = 0; i < item.length; i++){
            if(processedItem[i] == ' '){
                let splitStr = processedItem.toLowerCase().split(' ');
                for (j = 0; j < splitStr.length; j++) {
                    // You do not need to check if i is larger than splitStr length, as your for does that for you
                    // Assign it back to the array
                    splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);     
                }
    
                processedItem = splitStr.join(' ');
                break;
            }
        };
    
        const newMunicipality = document.createElement('option');
        newMunicipality.innerHTML = processedItem;
        newMunicipality.setAttribute('value', item);

        // change innerHTML of other para di lang 'other' nakalagay
        if(item == 'other'){
          newMunicipality.innerHTML = 'Other (Please specify)'
        }
    
        municipality.appendChild(newMunicipality);
    });
}
