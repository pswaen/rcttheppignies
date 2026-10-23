# RCTT Heppignies — application installable (PWA)

## Étape 1 — Autoriser l'affichage dans un cadre (Apps Script)

Sans cette modification, la page d'entrée reste blanche.

Dans l'éditeur Apps Script, fonction `doGet`, ajoutez `.setXFrameOptionsMode(...)` :

```javascript
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')   // ou createTemplateFromFile(...).evaluate()
    .setTitle('RCTT Heppignies')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Puis : **Déployer > Gérer les déploiements > crayon (Modifier) > Version : Nouvelle version > Déployer**.
L'adresse /exec reste la même.

Vérifiez aussi que l'accès est **« Tout le monde »** : une connexion Google dans un cadre fonctionne mal sur iPhone.

## Étape 2 — Héberger les fichiers gratuitement (GitHub Pages)

1. Créez un compte sur github.com (gratuit).
2. Nouveau dépôt (« New repository »), par exemple `rctt`, en **Public**.
3. « Add file > Upload files » : glissez tous les fichiers de ce dossier (sauf ce LISEZMOI si vous voulez).
4. **Settings > Pages** > Source : « Deploy from a branch », branche `main`, dossier `/ (root)` > Save.
5. Après 1 à 2 minutes, l'application est disponible à : `https://VOTRE-NOM.github.io/rctt/`

C'est **cette adresse** qu'on donne aux membres du club.

## Étape 3 — Installer sur le téléphone

- **Android (Chrome)** : ouvrir l'adresse > menu ⋮ > *Installer l'application*.
- **iPhone (Safari obligatoirement)** : ouvrir l'adresse > bouton Partager > *Sur l'écran d'accueil*.

## Mises à jour

- Modifier l'application Apps Script : rien à faire ici, la mise à jour est visible immédiatement (après un nouveau déploiement).
- Modifier les fichiers de ce dossier : changer `rctt-v1` en `rctt-v2` dans `sw.js`.
