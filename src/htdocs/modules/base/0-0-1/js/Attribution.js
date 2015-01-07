/* global define */
define([
], function (
) {
	'use strict';

	// TODO :: Configurable
	var LOGO_ROOT = 'images/logos/';

	var MULTI_MAP = {
		AK: 'AK,AEIC',
		AEIC: 'AK,AEIC',

		AT: 'AT,ATWC',
		ATWC: 'AT,ATWC',

		PT: 'PT,PTWC',
		PTWC: 'PT,PTWC',

		UW: 'UW,PNSN',
		PNSN: 'UW,PNSN',

		US: 'US,NEIC',
		NEIC: 'US,NEIC'
	};

	var SOURCE_MAP = {
		'AK,AEIC': {id: 'AK,AEIC', 'title': 'Alaska Earthquake Information Center', 'url': 'http://www.aeic.alaska.edu/', 'logo': LOGO_ROOT + 'AK.jpg'},
		'AT,ATWC': {id: 'AT,ATWC', 'title': 'National Tsunami Warning Center', 'url': 'http://ntwc.arh.noaa.gov', 'logo': LOGO_ROOT + 'PT.jpg'},
		'CI': {id: 'CI', 'title': 'Southern California Seismic Network, Caltech, USGS Pasadena, and Partners', 'url': 'http://www.cisn.org/', 'logo': LOGO_ROOT + 'CI.gif'},
		'HV': {id: 'HV', 'title': 'Hawaii Volcano Observatory', 'url': 'http://hvo.wr.usgs.gov/', 'logo': ''},
		'LD': {id: 'LD', 'title': 'Lamont-Doherty Cooperative Seismographic Network', 'url': 'http://www.ldeo.columbia.edu/LCSN/', 'logo': ''},
		'MB': {id: 'MB', 'title': 'Montana Bureau of Mines and Geology', 'url': 'http://www.mbmg.mtech.edu/', 'logo': LOGO_ROOT + 'MB.gif'},
		'NC': {id: 'NC', 'title': 'Northern California Seismic System, UC Berkeley and USGS Menlo Park', 'url': 'http://www.ncedc.org/', 'logo': ''},
		'NE': {id: 'NE', 'title': 'New England Seismic Network', 'url': 'http://aki.bc.edu/', 'logo': ''},
		'NM': {id: 'NM', 'title': 'New Madrid Seismic Network', 'url': 'http://www.ceri.memphis.edu/seismic/', 'logo': ''},
		'NN': {id: 'NN', 'title': 'Nevada Seismological Laboratory', 'url': 'http://www.seismo.unr.edu/', 'logo': LOGO_ROOT + 'NN.gif'},
		'PR': {id: 'PR', 'title': 'Puerto Rico Seismic Network', 'url': 'http://redsismica.uprm.edu/english/', 'logo': ''},
		'PT,PTWC': {id: 'PT,PTWC', 'title': 'Pacific Tsunami Warning Center', 'url': 'http://ptwc.weather.gov/', 'logo': LOGO_ROOT + 'PT.jpg'},
		'SE': {id: 'SE', 'title': 'Center for Earthquake Research and Information', 'url': 'http://www.ceri.memphis.edu/seismic/', 'logo': ''},
		'UU': {id: 'UU', 'title': 'University of Utah Seismograph Stations', 'url': 'http://www.seis.utah.edu/', 'logo': ''},
		'UW,PNSN': {id: 'UW,PNSN', 'title': 'Pacific Northwest Seismic Network', 'url': 'http://www.pnsn.org/', 'logo': ''},
		'US,NEIC': {id: 'US,NEIC', 'title': 'USGS National Earthquake Information Center', 'url': 'http://earthquake.usgs.gov/contactus/golden/neic.php', 'logo': LOGO_ROOT + 'usgs.gif'},
		'AEI': {id: 'AEI', title: 'Alaska Earthquake Information Center, Fairbanks'},
		'ALG': {id: 'ALG', title: 'CRAAG, Alger-Bouzareah, Algeria'},
		'ALQ': {id: 'ALQ', title: 'Albuquerque Seismological Laboratory, Albuquerque, New Mexico, USA'},
		'ANZA': {id: 'ANZA', title: 'Anza Seismic Network, IGPP, UC San Diego, La Jolla, California, USA'},
		'ASRS': {id: 'ASRS', title: 'GSRAS Siberian Branch, Altay-Sayan Seis. Ctr., Novosibirsk, Russia'},
		'ATH': {id: 'ATH', title: 'National Observatory of Athens, Greece'},
		'AUST': {id: 'AUST', title: 'Geoscience Australia, Canberra, ACT, Australia'},
		'AZER': {id: 'AZER', title: 'Rep. Center of Seismic Survey, Azerbaijan Academy of Science, Baku'},
		'BARI': {id: 'BARI', title: 'Osservatorio Sismologico, Universita degli Studi di Bari, Italy'},
		'BDF': {id: 'BDF', title: 'Observatorio Sismologico, Universidade de Brasilia, Brazil'},
		'BEO': {id: 'BEO', title: 'Seismological Survey of Serbia, Belgrade, Serbia'},
		'BER': {id: 'BER', title: 'Institutt for geovitenskap, Universitetet i Bergen, Norway'},
		'BGS': {id: 'BGS', title: 'British Geological Survey, Edinburgh, United Kingdom'},
		'BJI': {id: 'BJI', title: 'China Earthquake Administration, Beijing, China'},
		'BLA': {id: 'BLA', title: 'Virginia Polytechnic Institute and State University, Blacksburg, USA'},
		'BRK': {id: 'BRK', title: 'University of California, Berkeley, USA'},
		'BSE': {id: 'BSE', title: 'Boise State University, Idaho, USA'},
		'BUC': {id: 'BUC', title: 'National Institute for Earth Physics, Bucharest-Magurele, Romania'},
		'BUD': {id: 'BUD', title: 'Hungarian Seismological Institute, Budapest'},
		'BUT': {id: 'BUT', title: 'Montana Bureau of Mines and Geology, Butte, USA'},
		'CAR': {id: 'CAR', title: 'FUNVISIS, Caracas, Venezuela'},
		'CASC': {id: 'CASC', title: 'Central American Seismic Center, San Jose, Costa Rica'},
		'CDMG': {id: 'CDMG', title: 'California Division of Mines and Geology, Sacramento, USA'},
		'CDWR': {id: 'CDWR', title: 'California Department of Water Resources, Sacramento, USA'},
		'CERI': {id: 'CERI', title: 'Center for Earthquake Research and Information, Memphis, Tennessee'},
		'CRT': {id: 'CRT', title: 'Instituto Andaluz de Geofisica, Universidad de Granada, Spain'},
		'CSC': {id: 'CSC', title: 'University of South Carolina, Columbia, USA'},
		'CSEM': {id: 'CSEM', title: 'Centre Sismologique Euro-Mediterraneen, Bruyeres-le-Chatel, France'},
		'DBN': {id: 'DBN', title: 'Koninkijk Nederlands Meteorologisch Instituut, De Bilt, Netherlands'},
		'DMN': {id: 'DMN', title: 'Department of Mines and Geology, Kathmandu, Nepal'},
		'ECX': {id: 'ECX', title: 'RESNOM, CICESE, Ensenada, Baja California, Mexico'},
		'ERIJ': {id: 'ERIJ', title: 'Earthquake Research Institute, Univ. of Tokyo, Japan'},
		'EXP': {id: 'EXP', title: 'Explosion parameters from any group other than DOE or predecessors'},
		'FDF': {id: 'FDF', title: 'IPG Observatoire Geophysique, St. Pierre, Martinique'},
		'FLAG': {id: 'FLAG', title: 'Arizona Earthquake Information Center, Flagstaff, USA'},
		'GCG': {id: 'GCG', title: 'INSIVUMEH, Guatemala City, Guatemala'},
		'GII': {id: 'GII', title: 'Geophysical Institute of Israel, Lod, Israel'},
		'GRF': {id: 'GRF', title: 'BGR, Zentralobservatorium Graefenberg, Erlangen, Germany'},
		'GRN': {id: 'GRN', title: 'Lab. de Geophysique Interne et de Tectonophysique, Grenoble, France'},
		'GUC': {id: 'GUC', title: 'Departamento de Geofisica, Universidad de Chile, Santiago'},
		'HEL': {id: 'HEL', title: 'Seismologian Laitos, Helsingin Yliopisto, Helsinki, Finland'},
		'HFS': {id: 'HFS', title: 'The Swedish Defence Research Agency, FOI, Stockholm, Sweden'},
		'HON': {id: 'HON', title: 'NOAA, Pacific Tsunami Warning Center, Honolulu, Hawaii'},
		'HVO': {id: 'HVO', title: 'USGS Hawaiian Volcano Observatory, Hawaii, USA'},
		'IGIL': {id: 'IGIL', title: 'Inst. Geofisico do Infante D. Luis, Univ. de Lisboa, Lisbon, Portugal'},
		'INEL': {id: 'INEL', title: 'Idaho Nat. Engineering and Environmental Laboratory, Idaho Falls, USA'},
		'INET': {id: 'INET', title: 'Instituto Nicaraguense de Estudios Territoriales, Managua, Nicaragua'},
		'INMG': {id: 'INMG', title: 'Instituto de Meteorologia, Lisbon, Portugal'},
		'ISK': {id: 'ISK', title: 'Kandilli Observatory & Earthquake Research Inst., Istanbul, Turkey'},
		'ISTP': {id: 'ISTP', title: 'Instituto Superior Tecnico, Lisbon, Portugal'},
		'JMA': {id: 'JMA', title: 'Japan Meteorological Agency, Tokyo, Japan'},
		'JSN': {id: 'JSN', title: 'University of the West Indies, Mona, Jamaica'},
		'KAZK': {id: 'KAZK', title: 'Seismological Institute, Kazakhstan Academy of Sciences, Almaty'},
		'KLM': {id: 'KLM', title: 'Malaysian Meteorological Department, Petaling Jaya, Selangor, Malaysia'},
		'LASA': {id: 'LASA', title: 'Large Aperture Seismic Array, Billings, Montana (closed)'},
		'LDG': {id: 'LDG', title: 'CEA Lab. de Detection et de Geophysique, Bruyeres-le-Chatel, France'},
		'LIM': {id: 'LIM', title: 'Instituto Geofisico del Peru, Lima, Peru'},
		'LJU': {id: 'LJU', title: 'ARSO, Urad za seizmologijo, Ljubljana, Slovenia'},
		'LOA': {id: 'LOA', title: 'Los Alamos Scientific Laboratories, Los Alamos, New Mexico, USA'},
		'LVM': {id: 'LVM', title: 'Lawrence Livermore National Laboratory, Livermore, California, USA'},
		'MACRO': {id: 'MACRO', title: 'Macroseismic location'},
		'MDD': {id: 'MDD', title: 'Instituto Geografico Nacional, Madrid, Spain'},
		'NAO': {id: 'NAO', title: 'NTNF/NORSAR, Kjeller, Norway'},
		'NAT': {id: 'NAT', title: 'Departamento de Fisica Teorica e Experimental, UFRN, Natal, Brazil'},
		'NDI': {id: 'NDI', title: 'India Meteorological Department, New Delhi'},
		'NEIC': {id: 'NEIC', title: 'USGS, NEIC, Golden, Colorado (and predecessors)'},
		'NIC': {id: 'NIC', title: 'Geological Survey Department, Nicosia, Cyprus'},
		'NIED': {id: 'NIED', title: 'Nat. Res. Inst. for Earth Sci. and Disaster Prevention, Tsukuba, Japan'},
		'OBN': {id: 'OBN', title: 'GSRAS, Russian National Seismological Center, Obninsk, Russia'},
		'OGSO': {id: 'OGSO', title: 'OhioSeis Network, Ohio Geological Survey, Columbus'},
		'OMAN': {id: 'OMAN', title: 'Department of Earth Sciences, Sultan Qaboos University, Al-Khod, Oman'},
		'OTT': {id: 'OTT', title: 'Geological Survey of Canada, Ottawa, Canada'},
		'PAL': {id: 'PAL', title: 'Lamont-Doherty Earth Observatory, Palisades, New York. USA'},
		'PAR': {id: 'PAR', title: 'Institut de Physique du Globe, Univ. P et M Curie, Paris, France'},
		'PAS': {id: 'PAS', title: 'Southern California Seismic Network, Caltech, USGS Pasadena, and Partners'},
		'PDG': {id: 'PDG', title: 'Seizmoloski zavod Crne Gore, Podgorica, Montenegro'},
		'PEPP': {id: 'PEPP', title: 'Princeton Earth Physics Project, Princeton, New Jersey, USA'},
		'PIVS': {id: 'PIVS', title: 'Philippine Inst. of Volcanology & Seismology, Quezon City, Philippines'},
		'PMR': {id: 'PMR', title: 'National Tsunami Warning Center, Palmer, Alaska, USA'},
		'PNNL': {id: 'PNNL', title: 'Pacific Northwest National Laboratory, Richland, Washington, USA'},
		'POLR': {id: 'POLR', title: 'POLARIS Project, Ottawa, Canada'},
		'PPT': {id: 'PPT', title: 'Laboratoire de Geophysique, Papeete, French Polynesia'},
		'PRE': {id: 'PRE', title: 'Council for Geoscience, Pretoria, South Africa'},
		'QUI': {id: 'QUI', title: 'Escuela Politecnica Nacional, Quito, Ecuador'},
		'REN': {id: 'REN', title: 'University of Nevada, Reno, USA'},
		'ROM': {id: 'ROM', title: 'Istituto Nazionale di Geofisica e Vulcanologia, Rome, Italy'},
		'RSPR': {id: 'RSPR', title: 'Red Sismica de Puerto Rico, Universidad de Puerto Rico, Mayaguez'},
		'RYD': {id: 'RYD', title: 'King Saud University, Riyadh, Saudi Arabia'},
		'SAPN': {id: 'SAPN', title: 'Emergency Management Office, Saipan, Northern Mariana Islands'},
		'SCP': {id: 'SCP', title: 'Pennsylvania State University, State College, USA'},
		'SDD': {id: 'SDD', title: 'Universidad Autonoma de Santo Domingo, Dominican Republic'},
		'SEA': {id: 'SEA', title: 'Geophysics Program, University of Washington, Seattle, USA'},
		'SEO': {id: 'SEO', title: 'Korean Meteorological Administration, Seoul, South Korea'},
		'SJA': {id: 'SJA', title: 'Instituto Nacional de Prevencion Sismica, San Juan, Argentina'},
		'SKO': {id: 'SKO', title: 'Seismological Observatory, Skopje University, Macedonia'},
		'SLC': {id: 'SLC', title: 'University of Utah, Salt Lake City, USA'},
		'SNET': {id: 'SNET', title: 'Servicio Nac. de Estudios Territoriales, San Salvador, El Salvador'},
		'SNM': {id: 'SNM', title: 'New Mexico Institute of Mining and Technology, Socorro, USA'},
		'SNSN': {id: 'SNSN', title: 'Saudi NSN, King Abdulaziz City for Sci & Tech, Riyadh, Saudi Arabia'},
		'SOF': {id: 'SOF', title: 'Section of Seismology, Bulgarian Academy of Sciences, Sofia, Bulgaria'},
		'SPEC': {id: 'SPEC', title: 'Special NEIS solution'},
		'STR': {id: 'STR', title: 'Ecole et Observatoire des Sciences de la Terre, Strasbourg, France'},
		'TAP': {id: 'TAP', title: 'Central Weather Bureau, Taipei, Taiwan'},
		'TATO': {id: 'TATO', title: 'Institute of Earth Sciences, Academia Sinica, Taipei, Taiwan'},
		'THE': {id: 'THE', title: 'Geophysical Laboratory, University of Thessaloniki, Greece'},
		'TIR': {id: 'TIR', title: 'Seismological Center, Academy of Sciences of Albania, Tirana'},
		'TRI': {id: 'TRI', title: 'Ist. Nazle. di Oceanografia e di Geof. Sperimentale, Trieste, Italy'},
		'TRN': {id: 'TRN', title: 'University of the West Indies, St. Augustine, Trinidad'},
		'TVA': {id: 'TVA', title: 'Tennessee Valley Authority, Knoxville, Tennessee'},
		'UBIC': {id: 'UBIC', title: 'Univ. de Barcelona i Institut d\'Estudis Catalans, Barcelona, Spain'},
		'UCC': {id: 'UCC', title: 'Observatoire Royal de Belgique, Uccle, Brussels, Belgium'},
		'UCR': {id: 'UCR', title: 'Seccion de Sismologia, Univ. de Costa Rica, San Jose, Costa Rica'},
		'UNM': {id: 'UNM', title: 'Instituto de Geofisica, UNAM, Mexico City, DF, Mexico'},
		'UPA': {id: 'UPA', title: 'Instituto de Geociencias, Universidad de Panama, Panama'},
		'UPP': {id: 'UPP', title: 'Department of Earth Sciences, Uppsala University, Uppsala, Sweden'},
		'USAF': {id: 'USAF', title: 'US Air Force Technical Applications Center, Melbourne, Florida, USA'},
		'USAV': {id: 'USAV', title: 'USGS Alaska Volcano Observatory, Anchorage, USA'},
		'USBR': {id: 'USBR', title: 'US Bureau of Reclamation, Denver, Colorado, USA'},
		'USC': {id: 'USC', title: 'University of Southern California, Los Angeles, USA'},
		'UZBK': {id: 'UZBK', title: 'Institute of Seismology, Uzbekistan Academy of Sciences, Tashkent'},
		'VAO': {id: 'VAO', title: 'Inst. de Astron., Geof. e Ciencias Atmos., Univ. de Sao Paulo, Brazil'},
		'WAR': {id: 'WAR', title: 'Instytutu Geofizyki, Polskiej Akademii Nauk, Warsaw, Poland'},
		'WEL': {id: 'WEL', title: 'Inst. of Geological and Nuclear Sciences, Lower Hutt, New Zealand'},
		'WES': {id: 'WES', title: 'Weston Observatory, Boston College, Weston, Massachusetts, USA'},
		'ZAG': {id: 'ZAG', title: 'Geophysical Institute, University of Zagreb, Croatia'},
		'ZAMG': {id: 'ZAMG', title: 'ZentralAnstalt fuer Meteorologie und Geodynamik, Vienna, Austria'},
		'ZUR': {id: 'ZUR', title: 'Schweizerischer Erdbebendienst, Zurich, Switzerland'},
		'IDC': {id: 'IDC', title: 'Internation Data Center'},
		'AEIC': {id: 'AEIC', title: 'Alaska Earthquake Information Center, Fairbanks'},
		'AAE': {id: 'AAE', title: 'Geophysical Observatory, Adis Abeba University, Ethiopia'},
		'AAM': {id: 'AAM', title: 'University of Michigan, Ann Arbor, USA'},
		'ADE': {id: 'ADE', title: 'Primary Industries and Resources SA, Adelaide, S.A., Australia'},
		'AGS': {id: 'AGS', title: 'USGS Alaska Seismic Project, Menlo Park, California, USA'},
		'ATL': {id: 'ATL', title: 'Georgia Institute of Technology, Atlanta, USA'},
		'ATX': {id: 'ATX', title: 'University of Texas Institute for Geophysics, Austin, USA'},
		'AWIB': {id: 'AWIB', title: 'Alfred Wegener Inst. of Polar and Marine Research, Bremerhaven, Germany'},
		'BASV': {id: 'BASV', title: 'British Antarctic Survey, Cambridge, England, UK'},
		'BELR': {id: 'BELR', title: 'Inst. of Geochem. and Geophysics, Belarus Academy of Science, Minsk'},
		'BHD': {id: 'BHD', title: 'Seismology Unit, Scientific Research Council, Baghdad, Iraq'},
		'BHKY': {id: 'BHKY', title: 'University of Kentucky, Lexington, USA'},
		'BHL': {id: 'BHL', title: 'Conseil National de la Recherche Scientifique, Beirut, Lebanon'},
		'BKK': {id: 'BKK', title: 'Meteorological Department, Bangkok, Thailand'},
		'BKN': {id: 'BKN', title: 'Procurement Executive, Ministry of Defence, Blacknest, UK'},
		'BLMY': {id: 'BLMY', title: 'Indian Point Network, Woodward-Clyde Consultants, New Jersey, USA'},
		'BLY': {id: 'BLY', title: 'Institute for Material Testing, Banja Luka, Bosnia and Herzegovina'},
		'BMU': {id: 'BMU', title: 'Bahrain Meteorological Service, Bahrain'},
		'BNG': {id: 'BNG', title: 'Inst. de Recherche pour le Developpement, Bangui, Cen. African Rep.'},
		'BOU': {id: 'BOU', title: 'University of Colorado, Boulder, USA'},
		'BRG': {id: 'BRG', title: 'Seismologisches Observatorium, Berggiesshubel, Germany'},
		'BRS': {id: 'BRS', title: 'University of Queensland, Brisbane, Australia'},
		'BUL': {id: 'BUL', title: 'Goetz Observatory, Bulawayo, Zimbabwe'},
		'BYKL': {id: 'BYKL', title: 'GSRAS Siberian Branch, Baykal Regional Seis. Center, Irkutsk, Russia'},
		'BYT': {id: 'BYT', title: 'Central Institute of Mines, Katowice, Poland'},
		'CAM': {id: 'CAM', title: 'Massachusetts Institute of Technology, Cambridge, USA'},
		'CAN': {id: 'CAN', title: 'Australian National University, Canberra, ACT, Australia'},
		'CAT': {id: 'CAT', title: 'Instituto Scienze della Terra, Catania, Italy'},
		'CDPJ': {id: 'CDPJ', title: 'Nat. Research Ctr for Disaster Prevention, Ibaraki-ken, Japan--now NIED'},
		'CDR': {id: 'CDR', title: 'Commissariat a l\'Energie Atomique (CEA) Fontenay aux Roses, France'},
		'CFF': {id: 'CFF', title: 'Inst. et Observatoire de Physique du Globe, Clermont-Ferrand, France'},
		'CHC': {id: 'CHC', title: 'University of North Carolina, Chapel Hill, USA'},
		'CLL': {id: 'CLL', title: 'Geophysikalisches Observatorium, Univ. Leipzig, Collm, Germany'},
		'CNRM': {id: 'CNRM', title: 'Centre National de la Recherche Scient. et Tech., Rabat, Morocco'},
		'COR': {id: 'COR', title: 'College of Oceanography, Oregon State University, Corvallis, USA'},
		'CSS': {id: 'CSS', title: 'Geological Survey Department, Nicosia, Cyprus'},
		'DAL': {id: 'DAL', title: 'Southern Methodist University, Dallas, Texas, USA'},
		'DDA': {id: 'DDA', title: 'Directorate of Disaster Affairs, Lodumlu, Ankara, Turkey'},
		'DHMR': {id: 'DHMR', title: 'National Seismological Observatory Center, Dhamar, Yemen'},
		'DIAS': {id: 'DIAS', title: 'Dublin Institute for Advanced Studies, Ireland'},
		'DJA': {id: 'DJA', title: 'Badan Meteorologi dan Geofisika, Jakarta, Indonesia'},
		'DME': {id: 'DME', title: 'Department of Minerals and Energy, Pretoria, South Africa'},
		'DOE': {id: 'DOE', title: 'US Department of Energy (and predecessors) -- explosions'},
		'DRI': {id: 'DRI', title: 'Disaster Prevention Research Institute, Kyoto University, Japan'},
		'DRS': {id: 'DRS', title: 'GSRAS, Dagestan Regional Seismological Center, Makhachkala, Russia'},
		'DSIT': {id: 'DSIT', title: 'State Water Works Division (DSI), Ankara, Turkey'},
		'DTM': {id: 'DTM', title: 'Carnegie Institution of Washington, Washington, DC, USA'},
		'DUKE': {id: 'DUKE', title: 'Duke Power Company, South Carolina, USA'},
		'EDM': {id: 'EDM', title: 'University of Alberta, Edmonton, Canada'},
		'ENI': {id: 'ENI', title: 'Ente Nazionale Idrocarburi, Italy'},
		'ENT': {id: 'ENT', title: 'Geological Survey and Mines Department, Entebbe, Uganda'},
		'EPT': {id: 'EPT', title: 'Kidd Seismological Observatory, University of Texas, El Paso, USA'},
		'ERC': {id: 'ERC', title: 'Centro Ettore Majorana, Erice, Italy'},
		'EUO': {id: 'EUO', title: 'Department of Geological Sciences, University of Oregon, Eugene, USA'},
		'FIR': {id: 'FIR', title: 'Universita Degli Studi di Firenze, Firenze, Italy'},
		'FNET': {id: 'FNET', title: 'F-net Broadband Seismograph Network, University of Tokyo, Japan'},
		'FOG': {id: 'FOG', title: 'Osservatorio V. Nigri, Foggia, Italy'},
		'GAR': {id: 'GAR', title: 'Complex Seismological Expedition, Garm, Tajikistan'},
		'GBZT': {id: 'GBZT', title: 'TUBITAK, Marmara Research Center, Gebze, Turkey'},
		'GCMT': {id: 'GCMT', title: 'Lamont-Doherty Earth Observatory Global CMT project, New York, USA'},
		'GEOT': {id: 'GEOT', title: 'Teledyne Geotech Corporation, Garland, Texas, USA'},
		'GFZ': {id: 'GFZ', title: 'GeoForschungsZentrum Potsdam, Telegrafenberg, Potsdam, Germany'},
		'GIA': {id: 'GIA', title: 'Geophysical Institute, Univ. of Alaska, Fairbanks, USA'},
		'GOL': {id: 'GOL', title: 'Geophysics Department, Colorado School of Mines, Golden, USA'},
		'GOM': {id: 'GOM', title: 'Observatoire Volcanologique de Goma, Goma, Dem. Republic of the Congo'},
		'GRC': {id: 'GRC', title: 'Observatoire Sismologique, Garchy, France'},
		'GS': {id: 'GS', title: 'USGS, NEIC, Golden, Colorado (and predecessors) - used in PDE'},
		'GSDM': {id: 'GSDM', title: 'Geological Survey Department of Malawi, Zomba, Malawi'},
		'GUV': {id: 'GUV', title: 'CVG Electrificacion del Caroni (EDELCA) Guri, Venezuela'},
		'HACU': {id: 'HACU', title: 'Hacettepe University, Ankara, Turkey'},
		'HDC': {id: 'HDC', title: 'Universidad Nacional, Campus Omar Dengo, Heredia, Costa Rica'},
		'HIG': {id: 'HIG', title: 'Hawaii Institute of Geophysics, Honolulu, USA'},
		'HKC': {id: 'HKC', title: 'Hong Kong Observatory, Kowloon, Hong Kong, China'},
		'HKT': {id: 'HKT', title: 'University of Texas Marine Science Institute, Galveston, USA (now ATX)'},
		'HLW': {id: 'HLW', title: 'National Research Inst. of Astronomy and Geophysics, Helwan, Egypt'},
		'HNR': {id: 'HNR', title: 'Ministry of Natural Resources, Honiara, Solomon Islands'},
		'HRS': {id: 'HRS', title: 'Earthquake and Volcano Observatory, Hirosaki University, Japan'},
		'HRV': {id: 'HRV', title: 'Harvard University, Cambridge, Massachusetts'},
		'HSS': {id: 'HSS', title: 'Inst. of Seismology and Volcanology, Hokkaido Univ., Sapporo, Japan'},
		'HYB': {id: 'HYB', title: 'National Geophysical Research Institute, Hyderabad, India'},
		'INDR': {id: 'INDR', title: 'Inst. Nac. de Recursos Hidraulicos, Santo Domingo, Dominican Rep.'},
		'INPP': {id: 'INPP', title: 'Ignalina Nuclear Power Plant, Ignalina, Lithuania'},
		'INTV': {id: 'INTV', title: 'INTEVEP, Caracas, Venezuela'},
		'INY': {id: 'INY', title: 'Cornell University, Ithaca, New York, USA'},
		'IRSA': {id: 'IRSA', title: 'Institutul Roman de Seismologie Aplicata, Bucharest, Romania'},
		'ISC': {id: 'ISC', title: 'International Seismological Centre, UK'},
		'IST': {id: 'IST', title: 'Istanbul Technical University, Maslak, Istanbul, Turkey'},
		'JCK': {id: 'JCK', title: 'Geologisches Landesamt Nordrhein-Westfalen, Krefeld, Germany'},
		'JHI': {id: 'JHI', title: 'Regional Research Laboratory, Jorhat, India'},
		'JSO': {id: 'JSO', title: 'Jordan Seismological Observatory, Amman'},
		'KGS': {id: 'KGS', title: 'Kansas Geological Survey, University of Kansas, Lawrence, USA'},
		'KISR': {id: 'KISR', title: 'Kuwait Institute for Scientific Research, Safat, Kuwait'},
		'KNET': {id: 'KNET', title: 'Kyrgyz Broadband Seismic Network, La Jolla, Calif. and Kyrgyzstan'},
		'KORS': {id: 'KORS', title: 'GSRAS, Kola Regional Seismological Center, Apatity, Russia'},
		'KRSC': {id: 'KRSC', title: 'GSRAS, Kamchatka Regional Seismo. Center, Petropavlovsk, Russia'},
		'KRW': {id: 'KRW', title: 'Geophysikalisches Institut, Karlsruhe, Germany'},
		'KRYM': {id: 'KRYM', title: 'Crimean Geophysical Institute, Ukraine Academy of Science, Ukraine'},
		'KUK': {id: 'KUK', title: 'Ghana Geological Survey Department, Accra, Ghana'},
		'KYRG': {id: 'KYRG', title: 'Institute of Seismology, Kyrgyzstan Academy of Sciences, Bishkek'},
		'KYT': {id: 'KYT', title: 'Faculty of Science, Kyoto University, Japan'},
		'LBTB': {id: 'LBTB', title: 'Geological Survey of Botswana, Lobatse, Botswana'},
		'LDN': {id: 'LDN', title: 'University of Western Ontario, London, Ontario, Canada'},
		'LDSN': {id: 'LDSN', title: 'Libyan Center for Remote Sensing and Space Science, Tripoli, Libya'},
		'LGS': {id: 'LGS', title: 'Lithuanian Geological Survey, Vilnius, Lithuania'},
		'LJC': {id: 'LJC', title: 'Inst. of Geop. and Planet. Phys., UC San Diego, La Jolla, Calif, USA'},
		'LLI': {id: 'LLI', title: 'Instituto Internazionale di Vulcanologia--CNR, Catania, Italy'},
		'LPA': {id: 'LPA', title: 'Observatorio Astronomico, Univ. Nacional de La Plata, Argentina'},
		'LPZ': {id: 'LPZ', title: 'Observatorio San Calixto, La Paz, Bolivia'},
		'LSZ': {id: 'LSZ', title: 'Geological Survey Department, Lusaka, Zambia'},
		'LUB': {id: 'LUB', title: 'Texas Tech University, Lubbock, USA'},
		'LVV': {id: 'LVV', title: 'Carpathian Seismo. Dept., Ukraine Academy of Science, Lviv, Ukraine'},
		'MBO': {id: 'MBO', title: 'Institut de Recherche pour le Developpement, M\'Bour, Senegal'},
		'MEL': {id: 'MEL', title: 'Seismology Research Centre, Melbourne, Australia'},
		'MERI': {id: 'MERI', title: 'Maharashtra Engineering Research Institute, Nashik, India'},
		'MES': {id: 'MES', title: 'Instituto Geofisico e Geodetico, Messina, Italy'},
		'MHI': {id: 'MHI', title: 'Seismological Observatory, Mashhad, Iran'},
		'MNLO': {id: 'MNLO', title: 'USGS National Center for Earthquake Research, Menlo Park, Calif, USA'},
		'MNM': {id: 'MNM', title: 'University of Minnesota, Minneapolis, USA'},
		'MOLD': {id: 'MOLD', title: 'Institute of Geophysics and Geology, Chisinau, Moldova'},
		'MSCO': {id: 'MSCO', title: 'Mesa State College, Grand Junction, Colorado, USA'},
		'MSO': {id: 'MSO', title: 'University of Montana, Missoula, USA'},
		'MTAT': {id: 'MTAT', title: 'Mineral Research and Exploration Institute (MTA), Ankara, Turkey'},
		'MUI': {id: 'MUI', title: 'Geophysics Department, Ferdowsi University, Mashhad, Iran'},
		'MVOV': {id: 'MVOV', title: 'Montserrat Volcano Observatory, Mango Hill, Montserrat'},
		'NAI': {id: 'NAI', title: 'Geology Department, University of Nairobi, Nairobi, Kenya'},
		'NARS': {id: 'NARS', title: 'NARS network, University of Utrecht, The Netherlands'},
		'NASC': {id: 'NASC', title: 'National Antarctic Scientific Center of Ukraine, Kiev, Ukraine'},
		'NED': {id: 'NED', title: 'Delaware Geological Survey, Newark'},
		'NERS': {id: 'NERS', title: 'GSRAS, Northeastern Regional Seismological Center, Magadan, Russia'},
		'NGY': {id: 'NGY', title: 'RCSVDM, Graduate School of Environmental Studies, Nagoya Univ., Japan'},
		'NIPR': {id: 'NIPR', title: 'National Institute of Polar Research, Tokyo, Japan'},
		'NNC': {id: 'NNC', title: 'Nat. Nuclear Center, Inst. of Geophysical Research, Almaty, Kazakhstan'},
		'NOU': {id: 'NOU', title: 'Institut de Recherche pour le Developpement, Noumea, New Caledonia'},
		'NSAU': {id: 'NSAU', title: 'National Space Agency of Ukraine, Kiev, Ukraine'},
		'NSSC': {id: 'NSSC', title: 'National Syrian Seismological Center, Damascus'},
		'NSSP': {id: 'NSSP', title: 'National Survey of Seismic Protection, Yerevan, Armenia'},
		'OBM': {id: 'OBM', title: 'Mongolian Academy of Sciences, Ulaanbaatar'},
		'OVO': {id: 'OVO', title: 'Osservatorio Vesuviano, Naples, Italy'},
		'PDA': {id: 'PDA', title: 'Instituto de Meteorologia, Obs. Afonso Chaves, Ponta Delgada, Azores'},
		'PGEC': {id: 'PGEC', title: 'Pacific Gas and Electric, California, USA'},
		'PGC': {id: 'PGC', title: 'Geological Survey of Canada, Pacific Geoscience Centre, Sidney, BC'},
		'PINS': {id: 'PINS', title: 'Pakistan Inst. of Nuclear Science and Technology, Rawalpindi, Pakistan'},
		'PLV': {id: 'PLV', title: 'Inst. of Geophysics, Vietnamese Acad. of Science and Technology, Hanoi'},
		'PMG': {id: 'PMG', title: 'Geological Survey, Port Moresby, Papua New Guinea'},
		'PRO': {id: 'PRO', title: 'Osservatorio Valerio, Pesaro, Italy'},
		'PRT': {id: 'PRT', title: 'Osservatorio San Domenico, Prato, Italy'},
		'PTN': {id: 'PTN', title: 'State University of New York, Potsdam, New York, USA'},
		'PTO': {id: 'PTO', title: 'Porto (Serro do Pilar), Portugal'},
		'QCP': {id: 'QCP', title: 'Manila Observatory, Ateneo de Manila Univ., Manila, Philippines'},
		'QDM': {id: 'QDM', title: 'Queensland Department of Mines, Brisbane, Australia'},
		'QMB': {id: 'QMB', title: 'University of Leeds, Yorkshire, UK'},
		'QUE': {id: 'QUE', title: 'Pakistan Meteorological Department, Quetta, Pakistan'},
		'RAB': {id: 'RAB', title: 'Geological Survey, Vulcano Observatory, Rabaul, Papua New Guinea'},
		'RDJ': {id: 'RDJ', title: 'Observatorio Nacional, Rio de Janeiro, Brazil'},
		'REX': {id: 'REX', title: 'Brigham Young University - Idaho, Rexburg, Idaho, USA'},
		'RIPT': {id: 'RIPT', title: 'Research Inst. of Pulse Technique, Ministry for Atomic Energy, Russia'},
		'RLP': {id: 'RLP', title: 'Landeserdbebendienst Rheinland-Pfalz, Mainz, Germany'},
		'RMOD': {id: 'RMOD', title: 'Russian Ministry of Defense, Russia'},
		'SAKL': {id: 'SAKL', title: 'Sakhalin Complex Research Institute, Novoalexandrovsk -- now SKHL net'},
		'SAND': {id: 'SAND', title: 'Sandia Laboratories, Albuquerque, New Mexico, USA'},
		'SFS': {id: 'SFS', title: 'Real Instituto y Observatorio de la Armada, San Fernando, Spain'},
		'SHV': {id: 'SHV', title: 'Inst. of Seismology and Volcanology, Kyushu Univ., Shimabara, Japan'},
		'SKHL': {id: 'SKHL', title: 'GSRAS, Sakhalin Regional Seismological Ctr., Yuzhno-Sakhalinsk, Russia'},
		'SLCI': {id: 'SLCI', title: 'University of Utah Research Institute, Salt Lake City, USA'},
		'SLM': {id: 'SLM', title: 'St. Louis University, St. Louis, Missouri, USA'},
		'SORS': {id: 'SORS', title: 'Republic Hydrometeorological Inst., Banja Luka, Bosnia-Herzegovina'},
		'SPGM': {id: 'SPGM', title: 'Service de Physique du Globe, Rabat Agdal, Morocco'},
		'SRPD': {id: 'SRPD', title: 'Savannah River Laboratory, Aiken, South Carolina'},
		'SSO': {id: 'SSO', title: 'Osservatorio Geofisico Sperimentale, Macerata, Italy'},
		'SVA': {id: 'SVA', title: 'Department of Mineral Resources, Suva, Fiji'},
		'SVSA': {id: 'SVSA', title: 'Sistema de Vigilancia Sismologica dos Acores, Ponta Delgada, Azores'},
		'TAJK': {id: 'TAJK', title: 'Tajikistan Academy of Sciences, Dushanbe, Tajikistan'},
		'TAU': {id: 'TAU', title: 'University of Tasmania, Hobart, Australia'},
		'TBU': {id: 'TBU', title: 'Environmental Physics Institute, Tibet University, Lhasa, China'},
		'TEH': {id: 'TEH', title: 'Institute of Geophysics, University of Tehran, Iran'},
		'THR': {id: 'THR', title: 'Intl. Inst. of Earthquake Engineering and Seismology, Tehran, Iran'},
		'TIF': {id: 'TIF', title: 'Institute of Geophysics, Academy of Sciences of Georgia, Tbilisi, Georgia'},
		'TOH': {id: 'TOH', title: 'AOB, Graduate School of Science, Tohoku University, Sendai, Japan'},
		'TOL': {id: 'TOL', title: 'Observatorio Geofisico de Toledo, Spain (MDD network)'},
		'TRKM': {id: 'TRKM', title: 'Institute of Seismology, Turkmenistan Academy of Science, Ashgabat'},
		'TUL': {id: 'TUL', title: 'Oklahoma Geological Survey, Leonard, USA'},
		'TZN': {id: 'TZN', title: 'University of Dar es Salaam, Tanzania'},
		'UBC': {id: 'UBC', title: 'University of British Columbia, Vancouver, B.C., Canada'},
		'UPSL': {id: 'UPSL', title: 'University of Patras Seismological Laboratory, Patras, Greece'},
		'URS': {id: 'URS', title: 'Kochi University, Kochi, Japan'},
		'USCV': {id: 'USCV', title: 'USGS Cascades Volcano Observatory, Vancouver WA, USA'},
		'USGS': {id: 'USGS', title: 'US Geological Survey--other than ABQ, AGS, MNLO, NEIC, HVO and USAVO'},
		'UTSU': {id: 'UTSU', title: 'Utsunomiya University, Japan'},
		'UVC': {id: 'UVC', title: 'Universidad del Valle, Cali, Colombia'},
		'WIEN': {id: 'WIEN', title: 'Inst. fuer Meteorologie und Geophysik, Univ. Wien, Vienna, Austria'},
		'WIHG': {id: 'WIHG', title: 'Wadia Institute of Himalayan Geology, Dehra Dun, India'},
		'WWC': {id: 'WWC', title: 'Woodward-Clyde Consultants, California'},
		'YARS': {id: 'YARS', title: 'GSRAS Siberian Branch, Yakutiya Reg. Seis. Center, Yakutsk, Russia'},
		'ZON': {id: 'ZON', title: 'Universidad Nacional de San Juan, San Juan, Argentina'},
		'ACI': {id: 'ACI', title: 'Universita di Calabria, Cosenza, Italy'},
		'ACP': {id: 'ACP', title: 'Autoridad del Canal de Panama, Balboa-Ancon, Panama'},
		'ARO': {id: 'ARO', title: 'Observatoire Geophysique d\'Arta, Djibouti'},
		'AZUR': {id: 'AZUR', title: 'Geosciences Azur, Universite de Nice Sophia-Antipolis, Valbonne, France'},
		'BGRD': {id: 'BGRD', title: 'Bundesanstalt fur Geowissenschaften und Rohstoffe, Hannover, Germany'},
		'BNS': {id: 'BNS', title: 'Geologisches Inst. der Universitat Koln, Bergisch Gladbach, Germany'},
		'BOG': {id: 'BOG', title: 'Instituto Geofisico, Universidad Javeriana, Bogota, Colombia'},
		'BRA': {id: 'BRA', title: 'Geofyzikalny ustav SAV, Bratislava, Slovakia'},
		'BRL': {id: 'BRL', title: 'Freie Universitat Berlin, Berlin, Germany'},
		'BUG': {id: 'BUG', title: 'Ruhr-Universitaet, Bochum, Germany'},
		'CELS': {id: 'CELS', title: 'Comision Hidroelectrica del Rio Lempa, El Salvador'},
		'DESU': {id: 'DESU', title: 'CADAFE, Desarrollo Uribante Caparo (DESURCA), San Cristobal, Venezuela'},
		'DNGM': {id: 'DNGM', title: 'Direccao Nacional de Geologia, Maputo, Mozambique'},
		'DNK': {id: 'DNK', title: 'Danmarks og Gronlands Geologiske Undersogelse, Copenhagen, Denmark'},
		'FBB': {id: 'FBB', title: 'Geologisches Landesamt Baden-Wuerttemberg (LEDBW), Freiburg, Germany'},
		'FUR': {id: 'FUR', title: 'Geophysikalisches Obs. der Univ. Muenchen, Fuerstenfeldbruck, Germany'},
		'GEN': {id: 'GEN', title: 'Dipart. Studio del Territorio e Risorse, Universita di Genova, Italy'},
		'GFU': {id: 'GFU', title: 'Geofyzikalni ustav Akademie vid Ceske republiky, Praha, Czech Republic'},
		'ICE': {id: 'ICE', title: 'Instituto Costariccense de Electricidad, San Jose, Costa Rica'},
		'IIM': {id: 'IIM', title: 'Instituto de Ingenieria, UNAM, Mexico City, Mexico'},
		'IPEC': {id: 'IPEC', title: 'Ustav fyziky Zeme, Masaryk University, Brno, Czech Republic'},
		'JEN': {id: 'JEN', title: 'Inst. fuer Geowissenschaften, Friedrich-Schiller-Univ., Jena, Germany'},
		'JRQ': {id: 'JRQ', title: 'Centro de Geociencias, UNAM, Queretaro, Mexico'},
		'KBC': {id: 'KBC', title: 'Institut de Recherches Geologiques et Minieres, Ekona, Cameroon'},
		'KOWA': {id: 'KOWA', title: 'Ecole Nationale d\'Ingenieurs, Departement de Geologie, Bamako, Mali'},
		'LEI': {id: 'LEI', title: 'Institut fuer Geophysik und Geologie, Universitaet Leipzig, Germany'},
		'LIC': {id: 'LIC', title: 'Station Geophysique de Lamto, N\'Douci, Cote d\'Ivoire'},
		'LMM': {id: 'LMM', title: 'Servico Meteorologico de Mocambique, Maputo, Mozambique (closed)'},
		'LWI': {id: 'LWI', title: 'Departement de Geophysique, Lwiro, Democratic Republic of the Congo'},
		'MRB': {id: 'MRB', title: 'Institut Cartografic de Catalunya (ICC), Barcelona, Spain'},
		'MSKU': {id: 'MSKU', title: 'Universite des Sciences et Techniques de Masuku, Franceville, Gabon'},
		'OMPT': {id: 'OMPT', title: 'Observatoire Midi-Pyrenees, Toulouse, France'},
		'OUL': {id: 'OUL', title: 'Sodankylan Geofysiikan Observatorio, Oulun Yliopisto, Oulu, Finland'},
		'REY': {id: 'REY', title: 'Veourstofa Islands, Reykjavik, Iceland'},
		'RSNC': {id: 'RSNC', title: 'Red Sismica Nacional de Colombia, INGEOMINAS, Bogota, Colombia'},
		'RUVS': {id: 'RUVS', title: 'Rede Universitaria de Vigilancia Sismovulcanica, Sao Miguel, Azores'},
		'SBS': {id: 'SBS', title: 'Institut National de la Meteorologie, Tunis, Tunisia'},
		'SSNC': {id: 'SSNC', title: 'Centro Nacional de Investigaciones Sismologicas, Santiago de Cuba, Cuba'},
		'STU': {id: 'STU', title: 'Institut fuer Geophysik der Universitaet Stuttgart, Stuttgart, Germany'},
		'TAN': {id: 'TAN', title: 'Institut et Observatoire Geophysique d\'Antananarivo, Madagascar'},
		'UAV': {id: 'UAV', title: 'Laboratorio de Geofisica, Universidad de los Andes, Merida, Venezuela'},
		'UDEC': {id: 'UDEC', title: 'Universidad de Concepcion, Concepcion, Chile'},
		'UDO': {id: 'UDO', title: 'Centro de Sismologia, Universidad de Oriente, Cumana, Venezuela'},
		'UNAH': {id: 'UNAH', title: 'Universidad Nacional Autonoma de Honduras, Tegucigalpa, Honduras'}
	};

	var SOURCES = [];

	var Attribution = {

		setContributors: function (sources) {
			SOURCES = sources;
		},

		getContributors: function () {
			return SOURCES;
		},

		getContributor: function (id) {
			var title = null,
			    url = null,
			    src = null,
			    code = null;

			id = id.toUpperCase();
			code = id;

			if (MULTI_MAP.hasOwnProperty(code)) {
				code = MULTI_MAP[code];
			}

			if (SOURCE_MAP.hasOwnProperty(code)) {
				src = SOURCE_MAP[code];

				if (src.title) {
					title = src.title;
				}
				if (src.url) {
					url = src.url;
				}
			}
			return {
				id: id,
				title: title,
				url: url
			};
		},

		getContributorList: function () {

			var listMarkup = [],
			    source;

			for (var i = 0; i < SOURCES.length; i++) {
				source = SOURCES[i];
				listMarkup.push('<li>' + this.getName(source) + '</li>');
			}

			return '<ol class="contributors">' + listMarkup.join('') + '</ol>';
		},

		getContributorReference: function (contributor) {
			var source = contributor.toLowerCase(),
			    listPosition = SOURCES.indexOf(source) + 1,
			    span;

			/* When mapping does not exist, return the contributor text */
			if (listPosition === 0) {
				return contributor;
			}

			span = '<span>' + source.toUpperCase() + '<sup>[' + listPosition +
					']</sup></span>';

			return span;
		},


		getMainContributerHeader: function (id) {
			var contributor = this.getContributor(id),
			    url = contributor.url,
			    title = contributor.title,
			    code = contributor.id,
			    header;

			if (url !== null) {
				header = '<a target="_blank" href="' + url + '">' + title + ' (' + code + ')</a>';
			} else {
				header = title;
			}

			return header;
		},

		getName: function (id) {
			var contributor = this.getContributor(id),
			    title = contributor.title,
			    code =  contributor.id;

			if (!title) {
				title = code;
			}

			return title + ' (' + code + ')';
		}
	};

	return Attribution;
});
