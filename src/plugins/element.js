import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Menu,
    MenuItem,
    Row,
    Col,
    Card,
    Input,
    Pagination,
    Table,
    TableColumn,
    Dialog,
    Form,
    FormItem,
    Divider,
    Message,
    Upload,
    Tabs,
    TabPane,
    Alert,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
    Radio,
    Option,
    Select,
    RadioGroup,
    Tag,
    Popconfirm,
    MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Divider)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Radio)
Vue.use(Option)
Vue.use(Select)
Vue.use(RadioGroup)
Vue.use(Tag)
Vue.use(Popconfirm)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
