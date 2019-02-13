<template>
  <v-container grid-list-lg>
    <!-- row width -->
    <v-layout row justify-space-around>
      <v-flex md12 lg10 xl8>
        <!-- column -->
        <v-layout column>
          <!-- 1 card -->
          <v-flex>
            <v-card>
              <v-form>
                <v-container>
                  <v-layout column>
                    <v-flex>
                      <v-layout row wrap>
                        <v-flex>
                          <v-text-field label="ชื่อ"></v-text-field>
                        </v-flex>
                        <v-flex>
                          <v-text-field label="นามสกุล"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row wrap>
                        <v-flex sm4>
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              v-model="dateFormatted"
                              label="วันเกิด"
                              prepend-icon="cake"
                              mask="##/##/####"
                              hint="รูปแบบ วัน/เดือน/ปี(พ.ศ.)"
                              @blur="date = parseDate(dateFormatted)"
                              return-masked-value
                            ></v-text-field>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              scrollable
                              locale="th-th"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                            ></v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex sm4>
                          <v-text-field label="ชื่อเล่น"></v-text-field>
                        </v-flex>
                        <v-flex sm4>
                          <v-select :items="genderOptions" label="เพศ"></v-select>
                        </v-flex>
                      </v-layout>

                      <v-layout row wrap>
                        <v-flex>
                          <v-text-field
                            label="เลขประจำตัวประชาชนไทย"
                            mask="#-####-#####-##-#"
                            :rules="[rules.required, rules.national_id]"
                          ></v-text-field>
                        </v-flex>
                        <v-flex>
                          <v-select :items="religionOptions" label="ศาสนา"></v-select>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
          <!-- 1 card -->
          <!-- 2 card -->
          <v-flex>
            <v-card>
              <v-card-text>two</v-card-text>
            </v-card>
          </v-flex>
          <!-- 2 card -->
          <!-- 3 card -->
          <v-flex>
            <v-card>
              <v-card-text>three</v-card-text>
            </v-card>
          </v-flex>
          <!-- 3 card -->
        </v-layout>
        <!-- column -->
      </v-flex>
    </v-layout>
    <!-- row width -->
  </v-container>
</template>

<script>
const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

export const religions = {
  atheist: "ไม่นับถือศาสนา",
  buddhist: "ศาสนาพุทธ",
  christianity: "ศาสนาคริสต์",
  islam: "ศาสนาอิสลาม",
  other: "ศาสนาอื่นๆ"
};

export const grades = {
  m3: "มัธยมศึกษาปีที่ 3",
  m4: "มัธยมศึกษาปีที่ 4",
  m5: "มัธยมศึกษาปีที่ 5",
  m6: "มัธยมศึกษาปีที่ 6",
  p1: "ปวช.",
  other: "อื่นๆ"
};

export const genders = {
  male: "ชาย",
  female: "หญิง",
  other: "เพศอื่นๆ",
  unspecified: "ไม่ระบุ"
};

export const shirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL"
};

const religionOptions = Options(religions);
const gradeOptions = Options(grades);
const genderOptions = Options(genders);
const shirtSizeOptions = Options(shirtSizes);

function checkID(id) {
  if (id.length != 13) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(id.charAt(i)) * (13 - i);
  return (11 - (sum % 11)) % 10 === Number(id.charAt(12));
}

export default {
  data: () => ({
    religionOptions,
    gradeOptions,
    genderOptions,
    shirtSizeOptions,
    date: null,
    dateFormatted: null,
    menu: false,
    rules: {
      required: value => !!value || "Required.",
      national_id: val => checkID(val) || "เลขที่กรอกไม่ถูกต้อง"
    }
  }),
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${Number(year) + 543}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year - 543}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>