.. _setup_personal_access_token:

=====================================
Setup using the Personal Access Token
=====================================

This does not need to be done if you chose to set up the deploy keys using the steps above. This method is here for compatibility with the initial approach of this GitHub Action. The Personal Access Token would have access to all your repositories, so if it were to be leaked, the damage would be greater: it would allow pushes to the same repositories to which the Personal Access Token owner has access, and other possible associated permissions. On the other hand, the setup is a bit easier because it does not involve creating the deploy key.

Generate your Personal Access Token using the following steps:
 #. Go to the general GitHub Settings (on the right-hand side on the profile picture)

    .. image:: screenshots/pat-10.png
       :class: with-border

 #. On the left-hand side pane, scroll to the bottom and click on "Developer Settings"

    .. image:: screenshots/pat-20.png
       :class: with-border

 #. Click on "Personal Access Tokens" (also available at https://github.com/settings/tokens)

    .. image:: screenshots/pat-30.png
       :class: with-border

 #. Generate a new token entering a name and expiration date, and choose "Repo". Click the bottom button "Generate token". If you choose an expiration date you will need to create a new token after this date. In this example, I have used "No expiration"; this should be used carefully.

    .. image:: screenshots/pat-40.png
       :class: with-border

 #. Copy the displayed token

    .. image:: screenshots/pat-50.png
       :class: with-border

Then make the token available to the GitHub Action using the following steps:

 #. Go to the GitHub page for the repository that you push from (**origin repository**). Click on "Settings" for the repository

    .. image:: screenshots/ssh-key-50.png
       :class: with-border

 #. Click on "New repository secret"

    .. image:: screenshots/ssh-key-60.png)
       :class: with-border

 #. Name: "API_TOKEN_GITHUB"

 #. Value: paste the token that you copied earlier

 #. Click on "Add secret"

    .. image:: screenshots/pat-70.png
       :class: with-borders
