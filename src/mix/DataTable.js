import TableProxy from '../components/Commontable/Table'

const config = {
  components: { TableProxy },
  data() {
    return {
      dataTableReload: 1
    }
  },
  methods: {
    handleReload() {
      this.dataTableReload++
    }
  }
}

export default config
