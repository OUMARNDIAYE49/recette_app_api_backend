# API Gestion de Recettes

Cette API, développée avec **Express.js** et utilisant **MySQL** comme base de données, permet de gérer les recettes avec des fonctionnalités CRUD (Créer, Lire, Mettre à jour, Supprimer). Elle permet une gestion flexible et efficace des recettes.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (v16 ou supérieure)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (facultatif, pour tester l'API)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. Clonez le repository :

```bash
    git clone https://github.com/OUMARNDIAYE49/recette_app_api_backend.git
```

2. Accédez au dossier du projet :

```bash
    cd recette_app_api_backend
```

3. Installez les dépendances :

```bash
    npm install
```

4. Configurer la base de données :

- Assurez-vous que Mysql est en cours d'exécution sur votre machine locale.
- Mettez les paramètres de connexion dans src/config/dbConfig.js.
- Créez un fichier .env 
- copiez le contenu du fichier .env.example dans .env et mettez vos données


voici fichier .env.example
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mots de passe
DB_NAME=nom_de_la_base_de_donnée
port=port_spécifier

```

## Utilisation

Exécutez la commande suivante pour démarrer l'application, :

```bash
    npm start
```

## Routes disponibles

### 1. Récupérer toutes les recettes

- **URL** : `/recipes`
- **Méthode HTTP** : `GET`
- **Description** : Récupère toutes les recettes de la base de données.
- **Exemple** : http://localhost:4000/api/recipes/
- **Reponse** :
  ```bash
  [
   {
        "id": 38,
        "titre": "Riz au poison",
        "ingredients": "Poison, riz huil",
        "type": "plat",
        "categorie_id": 14
    },
    {
        "id": 65,
        "titre": "Couscous",
        "ingredients": "Couscous marocain, huil",
        "type": "plat",
        "categorie_id": 14
    }
  ]
  ```

### 2. Récupérer une recette par son ID

- **URL** : `/recipes/:id`
- **Méthode HTTP** : `GET`
- **Description** : Récupère une recette spécifique à partir de son ID.
- **Exemple URL** : http://localhost:4000/api/recipe/65
- **Reponse** :

  ```bash
   {
        "id": 65,
        "titre": "Couscous",
        "ingredients": "Couscous marocain, huil",
        "type": "plat",
        "categorie_id": 14
    }
  ```

### 3. Créer une nouvelle recette

- **URL** : `/recipes`
- **Méthode HTTP** : `POST`
- **Description** : Crée une nouvelle recette.
- **Exemple URL** : http://localhost:4000/api/recipes/
- **Corps de la requête** (JSON) :

```bash
 {
        "titre": "Couscous viande",
        "ingredients": "Couscous marocain, huil",
        "type": "plat",
        "categorie_id": 14
    }
```

- **Reponse** :

```bash
{
    "message": "Recette ajoutée avec succès"
}
```

### 4. Mettre à jour une recette

- **URL** : `/recipes/:id`
- **Méthode HTTP** : `PUT`
- **Description** : Met à jour les informations d'une recette existante en fonction de son ID.
- **Exemple URL** : http://localhost:4000/api/recipe/38

- **Corps de la requête** (JSON) :

```bash
 {
        "titre": "Riz au viande",
        "ingredients": "Viande, riz huil",
        "type": "plat",
        "categorie_id": 14
    },
```

- **Reponse** :

```bash
{
    "message": "Mise à jour réussie avec succès"
}
```

### 5. Supprimer une recette

- **URL** : `/recipes/:id`
- **Méthode HTTP** : `DELETE`
- **Description** : Supprime une recette existante en fonction de son ID.
- **Exemple URL** : http://localhost:4000/api/recipe/65
- **Reponse** :

```bash
{
    "message": "Suppression réussie avec succès"
}
```

## Routes disponibles pour les catégories

### 1. Récupérer toutes les catégories

- **URL** : `/categories`
- **Méthode HTTP** : `GET`
- **Description** : Récupère toutes les catégories de la base de données.
- **Exemple** : http://localhost:4000/api/categories/
- **Reponse** :
```bash
 [
   {
      "id": 14,
      "nom": "Plat principal"
    },
    {
      "id": 15,
      "nom": "Dessert"
    }
]
```

### 2. Récupérer une categorie par son ID

- **URL** : `/categories/:id`
- **Méthode HTTP** : `GET`
- **Description** : Récupère une catégorie spécifique à partir de son ID
- **Exemple URL** : http://localhost:4000/api/categories/14
- **Reponse** :

  ```bash
   {
        "id": 14,
        "nom": "Plat principal"
    }
  ```

### 3. Créer une nouvelle categorie

- **URL** : `/categories`
- **Méthode HTTP** : `POST`
- **Description** : Crée une nouvelle categorie.
- **Exemple URL** : http://localhost:4000/api/categories
- **Corps de la requête** (JSON) :

```bash
 {
       "nom": "Boisson"
    }
```

- **Reponse** :

```bash
{
    "message": "Categorie ajoutée avec succès"
}
```

### 4. Mettre à jour une categorie

- **URL** : `/categories/:id`
- **Méthode HTTP** : `PUT`
- **Description** : Met à jour les informations d'une categorie existante en fonction de son ID.
- **Exemple URL** : http://localhost:4000/api/categories/14

- **Corps de la requête** (JSON) :

  ```bash
 {
        "nom": "Entrée"
    },
  ```

- **Reponse** :

```bash
{
    "message": "Mise à jour réussie avec succès"
}
```

### 5. Supprimer une categorie

- **URL** : `/categories/:id`
- **Méthode HTTP** : `DELETE`
- **Description** : Supprime une categorie existante en fonction de son ID.
- **Exemple URL** : http://localhost:4000/api/categories/14
- **Reponse** :

```bash
{
    "message": "Suppression réussie avec succès"
}
```

## Collection de tests Postman

### Importer la collection Postman

Nous avons préparé une collection de requêtes Postman pour faciliter les tests de l'API. Vous pouvez l'importer dans Postman pour tester tous les endpoints CRUD (GET, POST, PUT, DELETE).

#### Étapes pour importer la collection :

1. Télécharger les collections Postman exportée  sont a la racine du projet.
2. Ouvrez Postman.
3. Cliquez sur **Importer** en haut à gauche.
4. Sélectionnez le fichier `.json` exporté et cliquez sur **Importer**.
5. Vous verrez la collection `recette_api` dans votre interface Postman.
7. Vous verrez la collection `categorie_api` dans votre interface Postman.

## Comment exécuter les tests unitaires

Assurez-vous que votre base de données est configurée correctement avant d'exécuter les tests. Jasmine affichera un rapport des tests exécutés, ainsi que les résultats (succès ou échecs).

```bash
npm test
```

- Cette commande lancera tous les tests définis dans les fichiers de test, notamment dans le répertoire `spec`.
- Le fichier principal de tests pour les opérations sur les recettes est `spec/recetteModel.spec.js`.

### Exemple de sortie lors de l'exécution des tests :

```bash
Jasmine started
CONNECTED

  RecetteModel
    √ devrait récupérer une recette par ID
    √ devrait récupérer toutes les recettes
    √ devrait mettre à jour une recette existante
    √ devrait créer une nouvelle recette
    √ devrait supprimer une recette par ID

  CategorieModel
    √ devrait récupérer une catégorie par ID
    √ devrait supprimer une catégorie par ID
    √ devrait créer une nouvelle catégorie
    √ devrait mettre à jour une catégorie existante
    √ devrait récupérer toutes les catégories

Executed 10 of 10 specs SUCCESS in 0.2 sec.
Randomized with seed 76136.
```

## Auteur

[Oumar Ndiaye](https://github.com/OUMARNDIAYE49/OumarNDIAYE)
