<template>
    <div class="entity-container">
        <div class="entity-customizer-header">
            <input type="text" class="entity-customizer-text-box" placeholder="Enter a fighter name...">
            <button class="entity-customizer-minimize">-</button>
        </div>
        <div class="rounded-divider"></div>
        <div class="entity-speed-row">
            <label class="speed-label">Speed:</label>
            <input type="range" class="entity-customizer-speed-slider" min="1" max="30" value="15" />
        </div>
        <div class="entity-size-row">
            <label class="size-label">Size:</label>
            <input type="range" class="entity-customizer-size-slider" min="1" max="30" value="15" />
        </div>
        <div class="entity-color-row">
            <label class="color-label">Color:</label>
            <div class="entity-customizer-color-box"></div>
        </div>
        <div class="entity-customizer-color-picker">
            <div class="entity-customizer-color-picker-box">
                <div class="entity-customizer-color-picker-wheel"></div>
            </div>
            <div class="entity-customizer-color-picker-pointer"></div>
        </div>
        <div class="matchups-label">Matchups:</div>
        <div class="entity-customizer-matchups-container">
            <table class="matchups-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Prey</th>
                        <th>Predator</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: "EntityEditorItem",
  props: {
  },
};
</script>

<style scope>
.entity-container {
    position: relative;
    height: 35%;
    border-top: 2px solid rgb(187, 187, 187);;
    border-bottom: 4px solid rgb(187, 187, 187);
    background-color: rgb(68, 68, 68);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
}

.entity-customizer-header
{
    display: flex;
    flex-wrap: nowrap;
    width: 97%;
    /* justify-content:space-evenly; */
    flex: 1;
}

.entity-customizer-text-box
{
    border: 1px solid rgb(32, 32, 32);
    border-radius: 30px;
    height: 70%;
    min-width: 5px;
    flex: 20;
    outline-width: 0;
    padding-left: 4%;
}

.entity-customizer-minimize
{
    background-color: rgb(92, 92, 92);
    width: 5%;
    height: 65%;
    flex: 3;
    border-radius: 30px;
    border-style: none;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5vh;
    font-weight: bold;
}

.rounded-divider
{
    background-color:  rgb(92, 92, 92);
    width: 97%;
    flex: 0.7;
    border-radius: 50px;
}

.entity-speed-row
{
    display: flex;
    flex-wrap: nowrap;
    width: 97%;
    /* justify-content:space-evenly; */
    flex: 5;
}

.speed-label
{
    padding-top: 1.6%;
    flex: 1;
    font-size: 2vh;
}

.entity-customizer-speed-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 1vh;
    background: rgb(131, 131, 131);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 15px;
    margin-top: 4%;
    flex: 5
}

.entity-customizer-speed-slider:hover {
    opacity: 1;
}

.entity-customizer-speed-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2vh;
    height: 2vh;
    background: #303030;
    cursor: pointer;
    border-radius: 15px;
}

.entity-customizer-speed-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #303030;
    cursor: pointer;
}

.entity-size-row
{
    display: flex;
    flex-wrap: nowrap;
    width: 97%;
    /* justify-content:space-evenly; */
    flex: 5;
}

.size-label
{
    padding-top: 1.6%;
    flex: 1;
    font-size: 2vh;
}

.entity-customizer-size-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 1vh;
    background: rgb(131, 131, 131);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 15px;
    margin-top: 4%;
    flex: 5
}

.entity-customizer-size-slider:hover {
    opacity: 1;
}

.entity-customizer-size-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2vh;
    height: 2vh;
    background: #303030;
    cursor: pointer;
    border-radius: 15px;
}

.entity-customizer-size-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #303030;
    cursor: pointer;
}

.entity-color-row
{
    display: flex;
    flex-wrap: nowrap;
    width: 97%;
    /* justify-content:space-evenly; */
    flex: 5;
}

.color-label
{
    padding-top: 0.8%;
    flex: 1;
    font-size: 2vh;
}

.entity-customizer-color-box
{
    width: 100%;
    height: 75%;
    background-color: rgba(71, 68, 255, 0.363);
    border: rgb(109, 109, 109);
    border-radius: 20px;
    border-width: 3px;
    border-style: solid;
    flex: 10;
}

.entity-customizer-color-picker
{
    position: fixed;
    z-index: 2;
    width: 200px;
    height: 200px;
    /* margin-left: 14.3%; */
    /* margin-top: -4%; */
    visibility: hidden;
    top: 0px;
    left: 0px;
}

.entity-customizer-color-picker-box
{
    position: fixed;
    z-index: 5;
    width: 160px;
    height: 200px;
    background-color: #818181;
    border-radius: 20px;
}

.entity-customizer-color-picker-pointer
{
    position: fixed;
	height: 50px;
	width: 50px;
	background: #818181;
	margin: 0 auto;
	transform: rotate(45deg);
	border-radius: 0 0 0 7px;
	position: relative;
    margin-left: -26px;
    margin-top: 61px;
    border-left: 3px solid #363636;
    border-bottom: 3px solid #363636;
    z-index: 1;
}

.entity-customizer-color-picker-wheel
{
    position: relative;
    margin-left: 5%;
    margin-top: 5%;
    z-index: 2;
}

.matchups-label
{
    flex: 0.5;
    font-size: 2vh;
}

.entity-customizer-matchups-container
{
    width: 90%;
    height: 90%;
    background-color: rgb(109, 109, 109);
    border-radius: 10px;
    flex: 30;
    overflow-x: hidden;
    overflow-y: auto;
}

.matchups-table thead tr
{
    background-color: rgb(139, 139, 139);
    font-weight: bold;
    /* font-size: 18; */
    /* border-bottom: 3px solid rgb(139, 139, 139);; */
}

.matchups-table tbody tr
{
    text-align: center;
    /* font-size: 15px; */
}

.matchups-table tbody tr:nth-of-type(even)
{
    text-align: center;
    background-color: rgb(139, 139, 139);;
}

.matchups-table td
{
    padding-top: 8px;
    padding-bottom: 8px;
}
</style>