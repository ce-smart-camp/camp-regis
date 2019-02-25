<template>
  <v-form ref="form" v-model="valid">
    <h3 class="title text-xs-center">ตรวจสอบข้อมูล</h3>
    <CamperInfo v-model="form.reg.info" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">การติดต่อ</h3>
    <CamperContact v-model="form.reg.contact" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">ข้อมูลสุขภาพ</h3>
    <CamperHealth v-model="form.reg.health" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">ที่อยู่</h3>
    <CamperAddress v-model="form.reg.address" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">การศึกษา</h3>
    <CamperEdu v-model="form.reg.edu" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">ผู้ปกครอง</h3>
    <CamperParent v-model="form.reg.parent" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">ประวัติการเข้าค่าย</h3>
    <CamperPass v-model="form.reg.pass" readonly />
    <v-divider />
    <h3 class="title mt-4 text-xs-center">คำถาม Part 2</h3>
    <AcademicLogic v-model="form.qus.logic" readonly class="pb-0" />
    <AcademicElect v-model="form.qus.elect" readonly class="py-0" />
    <AcademicPro v-model="form.qus.pro" readonly class="py-0" />
    <AcademicIot v-model="form.qus.iot" readonly class="pt-0" />
  </v-form>
</template>

<script>
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";
import AcademicLogic from "./../view/academic_logic";
import AcademicElect from "./../view/academic_elect";
import AcademicPro from "./../view/academic_pro";
import AcademicIot from "./../view/academic_iot";

export default {
  components: {
    CamperInfo,
    CamperContact,
    CamperHealth,
    CamperAddress,
    CamperEdu,
    CamperParent,
    CamperPass,
    AcademicLogic,
    AcademicElect,
    AcademicPro,
    AcademicIot
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    },
    show: Boolean
  },
  data: () => ({
    valid: false,
    form: {
      reg: {
        fb_id: null,
        info: null,
        contact: null,
        health: null,
        address: null,
        edu: null,
        parent: null,
        pass: null,
        created_at: null,
        update_at: null
      },
      qus: {
        logic: null,
        elect: null,
        pro: null,
        iot: null,
        update_at: null,
        completed_at: null
      }
    }
  }),
  watch: {
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    },
    show(val) {
      if (val) this.validate();
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>
