import NUMBER from "@root/NUMBER.const.js";
import RESPONSE from "@root/RESPONSE.const.js";
export default function _404_(_request, response) {
    response.status(NUMBER.HTTP_NOT_FOUND).send(RESPONSE[404]());
}
;
