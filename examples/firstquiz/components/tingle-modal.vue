<template>
<div>
  <slot></slot>
</div>
</template>

<script>
import tingle from "tingle.js";
import "../css/tingle.min.css";
import "../css/font.css";
export default {
  props: ["value", "content", "heading", "buttonText", "submit"],
  data() {
    return {
      modal: "",
    };
  },
  created() {
    this.modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ["overlay", "button", "escape"],
      closeLabel: "Close",
      cssClass: ["custom-class-1", "custom-class-2"],
      onOpen: function() {},
      onClose: () => {
        this.$emit("input", false);
      },
      beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
      },
    });

    // set content
    this.modal.setContent(
      `<h1 class='mb-1'>${this.heading}</h1><br/> ${this.content}`
    );
    // add a button
    this.modal.addFooterBtn(
      this.buttonText,
      "tingle-btn tingle-btn--primary tingle-btn--pull-right manrope-f-16",
      this.submit
    );
    // add another button
    this.modal.addFooterBtn(
      "Cancel",
      "tingle-btn tingle-btn--danger tingle-btn--pull-left manrope-f-16",
      this.handleClose
    );
  },
  methods: {
    handleClose() {
      this.$emit("input", false);
      this.modal.close();
    },
  },
  watch: {
    value(val, oldVal) {
      if (val) {
        // open modal
        this.modal.open();
      }
    },
  },
};
</script>

<style>
#mc_embed_signup {
  background: #fff;
  clear: left;
  font: 14px Helvetica, Arial, sans-serif;
}

/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
  We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
