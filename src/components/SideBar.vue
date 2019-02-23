<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :clipped="$vuetify.breakpoint.smAndUp"
      app
      width="280"
    >
      <v-list dense expand>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.icon"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="goto(child.goto)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="goto(item.goto)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.smAndUp"
      fixed
      dense
    >
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" />
        <span class="hidden-xs-only">ระบบสมัครค่าย </span>
        <span>CE Smart Camp #12</span>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import bus from "./../core/bus";

export default {
  props: {
    avatar: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    drawer: null,
    items: [
      {
        text: "ยินดีต้อนรับ",
        goto: 1,
        icon: "dashboard"
      },
      {
        icon: "account_box",
        text: "ข้อมูลส่วนตัว",
        model: true,
        children: [
          { goto: 2, text: "ข้อมูลเบื้องต้น", icon: "person" },
          { goto: 3, text: "การติดต่อ", icon: "contacts" },
          { goto: 4, text: "ข้อมูลสุขภาพ", icon: "local_hospital" },
          { goto: 5, text: "ที่อยู่", icon: "place" },
          { goto: 6, text: "การศึกษา", icon: "school" },
          { goto: 7, text: "ผู้ปกครอง", icon: "supervisor_account" },
          { goto: 8, text: "ประวัติการเข้าค่าย", icon: "style" }
        ]
      },
      {
        icon: "question_answer",
        text: "คำถาม Past 1",
        model: true,
        children: [
          { goto: 9, text: "Past 1/1", icon: "looks_one" },
          { goto: 10, text: "Past 1/2", icon: "looks_two" },
          { goto: 11, text: "Past 1/3", icon: "looks_3" },
          { goto: 12, text: "Past 1/4", icon: "looks_4" }
        ]
      },
      {
        icon: "mms",
        text: "คำถาม Past 2",
        model: true,
        children: [
          { goto: 13, text: "Past 2/1", icon: "filter_1" },
          { goto: 14, text: "Past 2/2", icon: "filter_2" },
          { goto: 15, text: "Past 2/3", icon: "filter_3" },
          { goto: 16, text: "Past 2/4", icon: "filter_4" }
        ]
      },
      {
        text: "บันทึกผล",
        goto: 13,
        icon: "save"
      }
    ]
  }),
  methods: {
    goto(val) {
      bus.$emit("step.goto", val);
    }
  }
};
</script>
