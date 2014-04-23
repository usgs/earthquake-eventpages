/* global define */
define([
	'scientific/ScientificSummaryPage',
	'scientific/HypocenterPage',
	'scientific/MomentTensorPage',
	'scientific/FocalMechanismPage',
	'scientific/FiniteFaultPage'
], function (
	ScientificSummaryPage,
	HypocenterPage,
	MomentTensorPage,
	FocalMechanismPage,
	FiniteFaultPage
) {
	'use strict';

	return {
		'scientific/ScientificSummaryPage': ScientificSummaryPage,
		'scientific/HypocenterPage': HypocenterPage,
		'scientific/MomentTensorPage': MomentTensorPage,
		'scientific/FocalMechanismPage': FocalMechanismPage,
		'scientific/FiniteFaultPage': FiniteFaultPage
	};

});