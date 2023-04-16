Feature: Search clinics by term

    Scenario: Prevent search clinics by term for logged-out user
        Given a user with no authentication
        When they search for clinics with the term "veterinary"
        Then they receive a 401 error response

    Scenario: Search clinics by term that match clinic name for logged-in user
        Given a logged-in user
        When they search for clinics with the term "veterinary"
        Then they receive a list of clinics that match the search term
        And each clinic name contains the word "veterinary"

    Scenario: Search clinics by term that does not match clinic name for logged-in user
        Given a logged-in user
        When they search for clinics with the term "not-exist"
        Then they receive an empty list of clinics
