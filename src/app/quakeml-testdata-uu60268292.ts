/* tslint:disable */

const EVENT_UU60268292 = `<?xml version="1.0" encoding="UTF-8"?>

<q:quakeml xmlns:q="http://quakeml.org/xmlns/quakeml/1.2" xmlns="http://quakeml.org/xmlns/bed/1.2" xmlns:catalog="http://anss.org/xmlns/catalog/0.1">
 <eventParameters publicID="quakeml:uu.anss.org/Event/UU/60268292#151873355837">
  <creationInfo>
   <agencyID>UU</agencyID>
   <creationTime>2018-02-15T22:25:58.37</creationTime>
  </creationInfo>
  <event publicID="quakeml:uu.anss.org/Event/UU/60268292" catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
   <preferredOriginID>quakeml:uu.anss.org/Origin/UU/222529</preferredOriginID>
   <preferredMagnitudeID>quakeml:uu.anss.org/Netmag/UU/295364</preferredMagnitudeID>
   <creationInfo>
    <agencyID>UU</agencyID>
    <creationTime>2018-02-15T22:25:38.00</creationTime>
    <version>4</version>
   </creationInfo>
   <type>earthquake</type>
   <origin publicID="quakeml:uu.anss.org/Origin/UU/222529" catalog:datasource="uu" catalog:dataid="uu60268292" catalog:eventsource="uu" catalog:eventid="60268292">
    <time>
     <value>2018-02-15T18:41:06.02</value>
    </time>
    <timeFixed>0</timeFixed>
    <latitude>
     <value>44.7378333</value>
    </latitude>
    <longitude>
     <value>-111.007</value>
    </longitude>
    <epicenterFixed>0</epicenterFixed>
    <depth>
     <value>8440</value>
     <uncertainty>720</uncertainty>
    </depth>
    <depthType>from location</depthType>
    <type>hypocenter</type>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
    <quality>
     <associatedPhaseCount>27</associatedPhaseCount>
     <usedPhaseCount>27</usedPhaseCount>
     <associatedStationCount>21</associatedStationCount>
     <usedStationCount>21</usedStationCount>
     <standardError>.13</standardError>
     <azimuthalGap>54</azimuthalGap>
     <secondaryAzimuthalGap>376</secondaryAzimuthalGap>
     <minimumDistance>2.150e-02</minimumDistance>
     <medianDistance>2.914e-01</medianDistance>
     <maximumDistance>5.617e-01</maximumDistance>
    </quality>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
    <originUncertainty>
     <confidenceEllipsoid>
      <semiMajorAxisLength>1752</semiMajorAxisLength>
      <semiMinorAxisLength>528</semiMinorAxisLength>
      <semiIntermediateAxisLength>720</semiIntermediateAxisLength>
      <majorAxisPlunge>79</majorAxisPlunge>
      <majorAxisAzimuth>354</majorAxisAzimuth>
      <majorAxisRotation>17</majorAxisRotation>
     </confidenceEllipsoid>
     <preferredDescription>confidence ellipsoid</preferredDescription>
     <confidenceLevel>95</confidenceLevel>
     <horizontalUncertainty>290</horizontalUncertainty>
    </originUncertainty>
    <methodID>smi:uu.anss.org/origin/HYP2000</methodID>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907274">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907274</pickID>
     <phase>P</phase>
     <azimuth>1.6</azimuth>
     <distance>2.150e-02</distance>
     <timeResidual>-.17</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>163</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907279">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907279</pickID>
     <phase>P</phase>
     <azimuth>309.6</azimuth>
     <distance>9.179e-02</distance>
     <timeResidual>.26</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>122</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907284">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907284</pickID>
     <phase>P</phase>
     <azimuth>65.5</azimuth>
     <distance>1.224e-01</distance>
     <timeResidual>-.1</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>113</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907289">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907289</pickID>
     <phase>P</phase>
     <azimuth>129.3</azimuth>
     <distance>1.274e-01</distance>
     <timeResidual>.17</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>111</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907294">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907294</pickID>
     <phase>P</phase>
     <azimuth>275.6</azimuth>
     <distance>1.354e-01</distance>
     <timeResidual>-.01</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>108</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907299">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907299</pickID>
     <phase>P</phase>
     <azimuth>206.8</azimuth>
     <distance>1.480e-01</distance>
     <timeResidual>.1</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>105</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907304">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907304</pickID>
     <phase>P</phase>
     <azimuth>136.5</azimuth>
     <distance>1.640e-01</distance>
     <timeResidual>-.02</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>102</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907309">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907309</pickID>
     <phase>S</phase>
     <azimuth>136.5</azimuth>
     <distance>1.640e-01</distance>
     <timeResidual>-.43</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.02</timeWeight>
     <takeoffAngle>
      <value>105</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907314">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907314</pickID>
     <phase>P</phase>
     <azimuth>260.4</azimuth>
     <distance>1.683e-01</distance>
     <timeResidual>.08</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>101</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907319">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907319</pickID>
     <phase>P</phase>
     <azimuth>95.4</azimuth>
     <distance>2.348e-01</distance>
     <timeResidual>-.02</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>93</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907324">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907324</pickID>
     <phase>S</phase>
     <azimuth>95.4</azimuth>
     <distance>2.348e-01</distance>
     <timeResidual>-.47</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.04</timeWeight>
     <takeoffAngle>
      <value>96</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907329">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907329</pickID>
     <phase>P</phase>
     <azimuth>50</azimuth>
     <distance>2.437e-01</distance>
     <timeResidual>.1</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>93</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907334">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907334</pickID>
     <phase>S</phase>
     <azimuth>50</azimuth>
     <distance>2.437e-01</distance>
     <timeResidual>-.06</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.04</timeWeight>
     <takeoffAngle>
      <value>95</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907339">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907339</pickID>
     <phase>P</phase>
     <azimuth>117</azimuth>
     <distance>2.914e-01</distance>
     <timeResidual>.16</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907344">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907344</pickID>
     <phase>S</phase>
     <azimuth>117</azimuth>
     <distance>2.914e-01</distance>
     <timeResidual>-.06</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.04</timeWeight>
     <takeoffAngle>
      <value>93</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907349">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907349</pickID>
     <phase>P</phase>
     <azimuth>156.9</azimuth>
     <distance>3.115e-01</distance>
     <timeResidual>-.12</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907354">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907354</pickID>
     <phase>S</phase>
     <azimuth>156.9</azimuth>
     <distance>3.115e-01</distance>
     <timeResidual>-.65</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.02</timeWeight>
     <takeoffAngle>
      <value>92</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907359">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907359</pickID>
     <phase>P</phase>
     <azimuth>287.3</azimuth>
     <distance>3.152e-01</distance>
     <timeResidual>-.16</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907364">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907364</pickID>
     <phase>P</phase>
     <azimuth>43.6</azimuth>
     <distance>3.268e-01</distance>
     <timeResidual>.17</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907369">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907369</pickID>
     <phase>P</phase>
     <azimuth>93.1</azimuth>
     <distance>3.536e-01</distance>
     <timeResidual>.02</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907374">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907374</pickID>
     <phase>S</phase>
     <azimuth>93.1</azimuth>
     <distance>3.536e-01</distance>
     <timeResidual>-.44</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.04</timeWeight>
     <takeoffAngle>
      <value>91</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907379">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907379</pickID>
     <phase>P</phase>
     <azimuth>138</azimuth>
     <distance>4.607e-01</distance>
     <timeResidual>.02</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907384">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907384</pickID>
     <phase>P</phase>
     <azimuth>112.2</azimuth>
     <distance>4.673e-01</distance>
     <timeResidual>.07</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907389">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907389</pickID>
     <phase>P</phase>
     <azimuth>269.3</azimuth>
     <distance>4.696e-01</distance>
     <timeResidual>-.11</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907394">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907394</pickID>
     <phase>P</phase>
     <azimuth>136.4</azimuth>
     <distance>4.804e-01</distance>
     <timeResidual>.03</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.07</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907399">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907399</pickID>
     <phase>P</phase>
     <azimuth>162.7</azimuth>
     <distance>4.887e-01</distance>
     <timeResidual>.09</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
    <arrival publicID="quakeml:uu.anss.org/AssocArO/UU/1907404">
     <pickID>quakeml:uu.anss.org/Arrival/UU/1907404</pickID>
     <phase>P</phase>
     <azimuth>193</azimuth>
     <distance>5.617e-01</distance>
     <timeResidual>-.07</timeResidual>
     <timeCorrection>0</timeCorrection>
     <timeWeight>0.14</timeWeight>
     <takeoffAngle>
      <value>90</value>
     </takeoffAngle>
     <creationInfo>
      <agencyID>UU</agencyID>
      <creationTime>2018-02-15T22:25:37.00</creationTime>
     </creationInfo>
    </arrival>
   </origin>
   <magnitude publicID="quakeml:uu.anss.org/Netmag/UU/295364">
    <mag>
     <value>2.58</value>
     <uncertainty>.144</uncertainty>
    </mag>
    <type>Ml</type>
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <stationCount>4</stationCount>
    <azimuthalGap>176.3</azimuthalGap>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
    <methodID>smi:uu.anss.org/magnitude/RichterMl2</methodID>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005539</stationMagnitudeID>
     <residual>0.19</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005564</stationMagnitudeID>
     <residual>-0.18</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005569</stationMagnitudeID>
     <residual>-0.54</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005549</stationMagnitudeID>
     <residual>-0.11</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005579</stationMagnitudeID>
     <residual>-1.20</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005604</stationMagnitudeID>
     <residual>-0.47</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005599</stationMagnitudeID>
     <residual>-0.60</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005594</stationMagnitudeID>
     <residual>0.10</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005554</stationMagnitudeID>
     <residual>-0.11</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005584</stationMagnitudeID>
     <residual>-1.19</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005589</stationMagnitudeID>
     <residual>0.10</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005574</stationMagnitudeID>
     <residual>-0.62</residual>
     <weight>0</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005559</stationMagnitudeID>
     <residual>-0.18</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocAmM/UU/1005544</stationMagnitudeID>
     <residual>0.19</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
   </magnitude>
   <magnitude publicID="quakeml:uu.anss.org/Netmag/UU/295369">
    <mag>
     <value>2.4</value>
     <uncertainty>.263</uncertainty>
    </mag>
    <type>Md</type>
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <stationCount>11</stationCount>
    <azimuthalGap>63.9</azimuthalGap>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:38.00</creationTime>
    </creationInfo>
    <methodID>smi:uu.anss.org/magnitude/HypoinvMd</methodID>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062434</stationMagnitudeID>
     <residual>0.26</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062454</stationMagnitudeID>
     <residual>0.02</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062459</stationMagnitudeID>
     <residual>-0.33</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062474</stationMagnitudeID>
     <residual>-0.52</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062439</stationMagnitudeID>
     <residual>-0.20</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062479</stationMagnitudeID>
     <residual>-0.24</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062444</stationMagnitudeID>
     <residual>0.51</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062464</stationMagnitudeID>
     <residual>0.24</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062429</stationMagnitudeID>
     <residual>0.19</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062469</stationMagnitudeID>
     <residual>-0.41</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
    <stationMagnitudeContribution>
     <stationMagnitudeID>quakeml:uu.anss.org/AssocCoM/UU/1062449</stationMagnitudeID>
     <residual>0.44</residual>
     <weight>1</weight>
    </stationMagnitudeContribution>
   </magnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062429">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.59</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062429</amplitudeID>
    <waveformID networkCode="WY" stationCode="YMC" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062434">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.66</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062434</amplitudeID>
    <waveformID networkCode="WY" stationCode="YGC" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062439">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.2</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062439</amplitudeID>
    <waveformID networkCode="WY" stationCode="YHH" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062444">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.91</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062444</amplitudeID>
    <waveformID networkCode="WY" stationCode="YPM" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062449">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.84</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062449</amplitudeID>
    <waveformID networkCode="WY" stationCode="YWB" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062454">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.42</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062454</amplitudeID>
    <waveformID networkCode="WY" stationCode="YDC" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062459">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.07</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062459</amplitudeID>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062464">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.64</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062464</amplitudeID>
    <waveformID networkCode="WY" stationCode="YML" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062469">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.99</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062469</amplitudeID>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062474">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.88</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062474</amplitudeID>
    <waveformID networkCode="WY" stationCode="YPP" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocCoM/UU/1062479">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.16</value>
    </mag>
    <type>MD</type>
    <amplitudeID>quakeml:uu.anss.org/Coda/UU/1062479</amplitudeID>
    <waveformID networkCode="WY" stationCode="MCID" channelCode="EHZ" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005539">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.77</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005539</amplitudeID>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHN" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005544">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.77</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005544</amplitudeID>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHE" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005549">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.47</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005549</amplitudeID>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHN" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005554">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.47</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005554</amplitudeID>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHE" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005559">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.4</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005559</amplitudeID>
    <waveformID networkCode="US" stationCode="LKWY" channelCode="BH1" locationCode="00" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005564">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.4</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005564</amplitudeID>
    <waveformID networkCode="US" stationCode="LKWY" channelCode="BH2" locationCode="00" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005569">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.04</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005569</amplitudeID>
    <waveformID networkCode="WY" stationCode="YMP" channelCode="HHN" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005574">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.96</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005574</amplitudeID>
    <waveformID networkCode="WY" stationCode="YMP" channelCode="HHE" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005579">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.38</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005579</amplitudeID>
    <waveformID networkCode="WY" stationCode="YTP" channelCode="HHN" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005584">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.39</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005584</amplitudeID>
    <waveformID networkCode="WY" stationCode="YTP" channelCode="HHE" locationCode="01" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005589">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.68</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005589</amplitudeID>
    <waveformID networkCode="US" stationCode="BOZ" channelCode="BH1" locationCode="00" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005594">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.68</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005594</amplitudeID>
    <waveformID networkCode="US" stationCode="BOZ" channelCode="BH2" locationCode="00" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005599">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>1.98</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005599</amplitudeID>
    <waveformID networkCode="IW" stationCode="LOHW" channelCode="BH1" locationCode="00" />
   </stationMagnitude>
   <stationMagnitude publicID="quakeml:uu.anss.org/AssocAmM/UU/1005604">
    <originID>quakeml:uu.anss.org/Origin/UU/222529</originID>
    <mag>
     <value>2.11</value>
    </mag>
    <type>ML</type>
    <amplitudeID>quakeml:uu.anss.org/Amp/UU/1005604</amplitudeID>
    <waveformID networkCode="IW" stationCode="LOHW" channelCode="BH2" locationCode="00" />
   </stationMagnitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005599">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00011964320205152</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="IW" stationCode="LOHW" channelCode="BH1" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005604">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000160886566154659</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="IW" stationCode="LOHW" channelCode="BH2" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005589">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000462102815508842</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="US" stationCode="BOZ" channelCode="BH1" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005594">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000568460803478956</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="US" stationCode="BOZ" channelCode="BH2" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005559">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000979605354368687</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="US" stationCode="LKWY" channelCode="BH1" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005564">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00121916066855192</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="US" stationCode="LKWY" channelCode="BH2" locationCode="00" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062479">
    <type>END</type>
    <genericAmplitude>
     <value>70.429</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:18.46</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907404</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="MCID" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062454">
    <type>END</type>
    <genericAmplitude>
     <value>106.0487</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:11.01</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907314</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YDC" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005554">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00165740724653006</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907354</pickID>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHE" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005549">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00211164452135563</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHN" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062469">
    <type>END</type>
    <genericAmplitude>
     <value>66.7687</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:13.64</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907349</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062434">
    <type>END</type>
    <genericAmplitude>
     <value>137.5088</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:09.83</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907279</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YGC" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062439">
    <type>END</type>
    <genericAmplitude>
     <value>87.997</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:10.21</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907284</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YHH" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062429">
    <type>END</type>
    <genericAmplitude>
     <value>132.374</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:08.57</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907274</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YMC" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062464">
    <type>END</type>
    <genericAmplitude>
     <value>124.1411</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:13.65</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907339</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YML" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005574">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000289005199447274</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YMP" channelCode="HHE" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005569">
    <type>AML</type>
    <genericAmplitude>
     <value>0.000346185592934489</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YMP" channelCode="HHN" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005544">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00701484024524689</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907324</pickID>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHE" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005539">
    <type>AML</type>
    <genericAmplitude>
     <value>0.00616710394620895</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHN" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062459">
    <type>END</type>
    <genericAmplitude>
     <value>74.5881</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:12.28</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907319</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062444">
    <type>END</type>
    <genericAmplitude>
     <value>172.1723</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:10.53</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907289</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YPM" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062474">
    <type>END</type>
    <genericAmplitude>
     <value>55.5837</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:17.40</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907399</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YPP" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005584">
    <type>AML</type>
    <genericAmplitude>
     <value>7.82714947126806e-05</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YTP" channelCode="HHE" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Amp/UU/1005579">
    <type>AML</type>
    <genericAmplitude>
     <value>7.52975093200803e-05</value>
    </genericAmplitude>
    <category>point</category>
    <unit>m</unit>
    <magnitudeHint>ML</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YTP" channelCode="HHN" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <amplitude publicID="quakeml:uu.anss.org/Coda/UU/1062449">
    <type>END</type>
    <genericAmplitude>
     <value>159.7784</value>
    </genericAmplitude>
    <category>duration</category>
    <unit>s</unit>
    <timeWindow>
     <reference>2018-02-15T18:41:10.74</reference>
     <begin>0.0</begin>
     <end>2</end>
    </timeWindow>
    <pickID>quakeml:uu.anss.org/Arrival/UU/1907299</pickID>
    <magnitudeHint>MD</magnitudeHint>
    <waveformID networkCode="WY" stationCode="YWB" channelCode="EHZ" locationCode="01" />
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>final</evaluationStatus>
   </amplitude>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907274">
    <time>
     <value>2018-02-15T18:41:08.57</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YMC" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907279">
    <time>
     <value>2018-02-15T18:41:09.83</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YGC" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907284">
    <time>
     <value>2018-02-15T18:41:10.21</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YHH" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907289">
    <time>
     <value>2018-02-15T18:41:10.53</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YPM" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907294">
    <time>
     <value>2018-02-15T18:41:10.35</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YHB" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907299">
    <time>
     <value>2018-02-15T18:41:10.74</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YWB" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907304">
    <time>
     <value>2018-02-15T18:41:10.87</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B207" channelCode="EHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907309">
    <time>
     <value>2018-02-15T18:41:13.50</value>
     <uncertainty>0.30</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B207" channelCode="EH2" locationCode="" />
    <onset>emergent</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907314">
    <time>
     <value>2018-02-15T18:41:11.01</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YDC" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907319">
    <time>
     <value>2018-02-15T18:41:12.28</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907324">
    <time>
     <value>2018-02-15T18:41:15.76</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YNR" channelCode="HHE" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907329">
    <time>
     <value>2018-02-15T18:41:12.54</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B945" channelCode="EHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907334">
    <time>
     <value>2018-02-15T18:41:16.40</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B945" channelCode="EH1" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907339">
    <time>
     <value>2018-02-15T18:41:13.65</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YML" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907344">
    <time>
     <value>2018-02-15T18:41:18.14</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YML" channelCode="EHN" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907349">
    <time>
     <value>2018-02-15T18:41:13.64</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907354">
    <time>
     <value>2018-02-15T18:41:17.99</value>
     <uncertainty>0.30</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YFT" channelCode="HHE" locationCode="01" />
    <onset>emergent</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907359">
    <time>
     <value>2018-02-15T18:41:13.60</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="MB" stationCode="QLMT" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907364">
    <time>
     <value>2018-02-15T18:41:14.08</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YMV" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907369">
    <time>
     <value>2018-02-15T18:41:14.63</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B206" channelCode="EHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907374">
    <time>
     <value>2018-02-15T18:41:19.60</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B206" channelCode="EH1" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907379">
    <time>
     <value>2018-02-15T18:41:16.69</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="TA" stationCode="H17A" channelCode="HHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907384">
    <time>
     <value>2018-02-15T18:41:16.87</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B208" channelCode="EHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907389">
    <time>
     <value>2018-02-15T18:41:16.77</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="MB" stationCode="TPMT" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907394">
    <time>
     <value>2018-02-15T18:41:17.07</value>
     <uncertainty>0.12</uncertainty>
    </time>
    <waveformID networkCode="PB" stationCode="B944" channelCode="EHZ" locationCode="" />
    <onset>impulsive</onset>
    <polarity>undecidable</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907399">
    <time>
     <value>2018-02-15T18:41:17.40</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="YPP" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
   <pick publicID="quakeml:uu.anss.org/Arrival/UU/1907404">
    <time>
     <value>2018-02-15T18:41:18.46</value>
     <uncertainty>0.06</uncertainty>
    </time>
    <waveformID networkCode="WY" stationCode="MCID" channelCode="EHZ" locationCode="01" />
    <onset>impulsive</onset>
    <polarity>positive</polarity>
    <evaluationMode>manual</evaluationMode>
    <evaluationStatus>reviewed</evaluationStatus>
    <creationInfo>
     <agencyID>UU</agencyID>
     <creationTime>2018-02-15T22:25:37.00</creationTime>
    </creationInfo>
   </pick>
  </event>
 </eventParameters>
</q:quakeml>
`;


export {
  EVENT_UU60268292
};
