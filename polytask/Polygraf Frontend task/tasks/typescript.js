"use strict";
function setValue(key, value) {
    console.log(`Set ${key} to ${value}`); //imagine this writes to something like LocalStorage or URLSearchParams
}
setValue("creation_date", "sj");
setValue("id", "123-sdfs-sf-sdf");
setValue("like_count", 100);
setValue("author", { age: 20, banned: false, name: "John", status: "online" });
/**
 * The following function should receive a list of allowed states and the initial state
 * Yet the current implementation doesn't check if the initial state is one of the allowed states
 *
 * This is a bonus question, and you don't need to successfully complete it, but points will be made
 * for your approach to solving this problem, even if you don't succeed. While it is possible, solving it is not trivial
 * in current versions of Typescript, but TS has added a utility type that trivially solves it on the day of making this excercize
 */
function bonus(allowed_states, initial) {
    console.log(allowed_states, initial);
}
bonus(["foo", "bar"], "invalid");
