<template>
  <v-stepper v-model="e6" vertical dark non-linear>
    <v-stepper-step :complete="e6 > 1" step="1" :editable="e6 > 1">
      Select an app
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-5">
        <v-form v-model="valid">
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm6 md6 lg4 xl3>
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  label="First name"
                  box
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6 lg4 xl3>
                <v-text-field v-model="lastname" :rules="nameRules" label="Last name" box required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6 lg4 xl3>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" box required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" :editable="e6 > 2">Configure analytics for this app</v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
      :editable="e6 > 3"
    >Select an ad format and name ad unit</v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" :editable="e6 > 4">View setup instructions</v-stepper-step>
    <v-stepper-content step="4">
      <v-card class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      e6: 1,
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [v => !!v || "Name is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  }
};
</script>