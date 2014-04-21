/* global define */
define([
	'scientific/ScientificSummaryPage',
	'scientific/HypocenterSummaryPage',
	'scientific/HypocenterDetailsPage',
	'scientific/MomentTensorSummaryPage',
	'scientific/MomentTensorDetailsPage',
	'scientific/FocalMechanismSummaryPage',
	'scientific/FocalMechanismDetailsPage',
	'scientific/FiniteFaultPage'
], function (
	ScientificSummaryPage,
	HypocenterSummaryPage,
	HypocenterDetailsPage,
	MomentTensorSummaryPage,
	MomentTensorDetailsPage,
	FocalMechanismSummaryPage,
	FocalMechanismDetailsPage,
	FiniteFaultPage
) {
	'use strict';

	return {
		'scientific/ScientificSummaryPage': ScientificSummaryPage,
		'scientific/HypocenterSummaryPage': HypocenterSummaryPage,
		'scientific/HypocenterDetailsPage': HypocenterDetailsPage,
		'scientific/MomentTensorSummaryPage': MomentTensorSummaryPage,
		'scientific/MomentTensorDetailsPage': MomentTensorDetailsPage,
		'scientific/FocalMechanismSummaryPage': FocalMechanismSummaryPage,
		'scientific/FocalMechanismDetailsPage': FocalMechanismDetailsPage,
		'scientific/FiniteFaultPage': FiniteFaultPage
	};

});