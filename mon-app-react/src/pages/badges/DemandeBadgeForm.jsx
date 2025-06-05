import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const DemandeBadgeForm = ({ demandeId, onSubmit, typeDemande }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom: '', prenom: '', nationalite: '', filiation: '', ben: '', etDe: '', situationFamiliale: '', nbEnfants: '', dateNaissance: '', cln: '', dateExpiration: '', passport: '', dateDelivrance: '', adresse: '', ville: '',
    organisme: '', fonction: '', dateRecrutement: '', dejaLaissezPasser: '', typeLaissezPasser: '', numLaissezPasser: '', objet: '', zonesSurete: '', portesAcces: '', modeReglement: '',
  });
  const [message, setMessage] = useState('');
  const [formulaireOk, setFormulaireOk] = useState(false);
  const [files, setFiles] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleNext = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Étapes 1 et 2 : soumission du formulaire texte
      await axios.put(
        `http://localhost:8081/api/demandes/${demandeId}/formulaire`,
        { formulaire: JSON.stringify(form) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Étape 3 : soumission des fichiers
      const formData = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      await axios.post(
        `http://localhost:8081/api/demandes/${demandeId}/documents`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Formulaire et documents envoyés avec succès !');
      setFormulaireOk(true);
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'envoi du formulaire ou des documents.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('PERMIS D\'ACCES TEMPORAIRE - Zone Réglementée', 10, 10);
    Object.entries(form).forEach(([key, value], i) => {
      doc.text(`${key}: ${value}`, 10, 20 + i * 10);
    });
    doc.save('formulaire_badge.pdf');
  };

  return (
    <form onSubmit={step === 3 ? handleSubmit : handleNext} style={{ background: '#fff', padding: 20, borderRadius: 8, maxWidth: 900 }}>
      <h3>Formulaire de Sûreté</h3>

      {/* Étape 1 : Informations personnelles */}
      {step === 1 && (
        <div>
          <h4>Informations personnelles</h4>
          <label>Nom : <input name="nom" value={form.nom} onChange={handleChange} required /></label><br />
          <label>Prénom : <input name="prenom" value={form.prenom} onChange={handleChange} required /></label><br />
          <label>Nationalité : <input name="nationalite" value={form.nationalite} onChange={handleChange} /></label><br />
          <label>Fils (le) de : <input name="filiation" value={form.filiation} onChange={handleChange} /></label><br />
          <label>Ben : <input name="ben" value={form.ben} onChange={handleChange} /></label><br />
          <label>Et de : <input name="etDe" value={form.etDe} onChange={handleChange} /></label><br />
          <label>Situation familiale : <input name="situationFamiliale" value={form.situationFamiliale} onChange={handleChange} /></label><br />
          <label>Nombre d’enfants : <input name="nbEnfants" value={form.nbEnfants} onChange={handleChange} /></label><br />
          <label>Date et lieu de naissance : <input name="dateNaissance" value={form.dateNaissance} onChange={handleChange} type="date" /></label><br />
          <label>N° C.I.N : <input name="cln" value={form.cln} onChange={handleChange} /></label><br />
          <label>Date d’expiration : <input name="dateExpiration" value={form.dateExpiration} onChange={handleChange} type="date" /></label><br />
          <label>N° Passeport : <input name="passport" value={form.passport} onChange={handleChange} /></label><br />
          <label>Date de délivrance : <input name="dateDelivrance" value={form.dateDelivrance} onChange={handleChange} type="date" /></label><br />
          <label>Adresse personnelle : <input name="adresse" value={form.adresse} onChange={handleChange} /></label><br />
          <label>Ville : <input name="ville" value={form.ville} onChange={handleChange} /></label><br />
          <button type="submit" style={{ marginTop: 20 }}>Suivant</button>
        </div>
      )}

      {/* Étape 2 : Informations professionnelles */}
      {step === 2 && (
        <div>
          <h4>Informations professionnelles et accès</h4>
          <label>Organisme Employeur : <input name="organisme" value={form.organisme} onChange={handleChange} /></label><br />
          <label>Fonction : <input name="fonction" value={form.fonction} onChange={handleChange} /></label><br />
          <label>Date de recrutement : <input name="dateRecrutement" value={form.dateRecrutement} onChange={handleChange} type="date" /></label><br />
          <label>Avez-vous déjà eu un laissez-passer ? 
            <select name="dejaLaissezPasser" value={form.dejaLaissezPasser} onChange={handleChange}>
              <option value="">--</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </label><br />
          <label>Type (Permanent/Temporaire) : <input name="typeLaissezPasser" value={form.typeLaissezPasser} onChange={handleChange} /></label><br />
          <label>Si oui, N° : <input name="numLaissezPasser" value={form.numLaissezPasser} onChange={handleChange} /></label><br />
          <label>Objet de l’autorisation d’accès : <input name="objet" value={form.objet} onChange={handleChange} /></label><br />
          <label>Zones de sûreté proposées : <input name="zonesSurete" value={form.zonesSurete} onChange={handleChange} /></label><br />
          <label>Portes d’accès proposées : <input name="portesAcces" value={form.portesAcces} onChange={handleChange} /></label><br />
          <label>Mode de règlement :
            <select name="modeReglement" value={form.modeReglement} onChange={handleChange}>
              <option value="">--</option>
              <option value="comptant">Comptant</option>
              <option value="facture">Facturé</option>
              <option value="exonere">Exonéré</option>
            </select>
          </label><br />
          <button onClick={handleBack} style={{ marginTop: 20 }}>Retour</button>
          <button type="submit" style={{ marginLeft: 10 }}>Suivant</button>
        </div>
      )}

      {/* Étape 3 : Upload de documents */}
      {step === 3 && (
        <div>
          <h4>Téléversement de documents</h4>
          <label>Photos agrafées : <input type="file" name="photo" onChange={handleFileChange} required /></label><br />
          <label>Attestation de travail (ou) Photocopies C.I. : <input type="file" name="attestation" onChange={handleFileChange} required /></label><br />
          <label>Photocopies de la C.I.N. : <input type="file" name="cin" onChange={handleFileChange} required /></label><br />
          <label>Quitus ONDA : <input type="file" name="quitus" onChange={handleFileChange} required /></label><br />
          <label>Copie (Statut + Convention) : <input type="file" name="statut_convention" onChange={handleFileChange} /></label><br />
          <label>Attestation d’acceptation de stage : <input type="file" name="attestation_stage" onChange={handleFileChange} /></label><br />
          <button onClick={handleBack} style={{ marginTop: 20 }}>Retour</button>
          <button type="submit" style={{ marginLeft: 10 }}>Envoyer</button>
          {message && <p>{message}</p>}
          {formulaireOk && (
            <button type="button" onClick={handleDownloadPDF} style={{ marginTop: 10 }}>
              Télécharger le formulaire PDF
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default DemandeBadgeForm;
