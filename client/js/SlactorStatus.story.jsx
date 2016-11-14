import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SlactorStatus from './SlactorStatus.jsx'; 
import { SAISIE, ENVOI, OK, KO } from './constants.js';

storiesOf('SlactorStatus', module).add('en cours de saisie', () => (
    <SlactorStatus status={SAISIE} />
));

storiesOf('SlactorStatus', module).add("en cours d'envoi", () => (
    <SlactorStatus status={ENVOI} />
));

storiesOf('SlactorStatus', module).add('message envoyé', () => (

    <SlactorStatus status={OK} />
));

storiesOf('SlactorStatus', module).add('non envoyé', () => (

    <SlactorStatus status={KO} error="erreur" />
));