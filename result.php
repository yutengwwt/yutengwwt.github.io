<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $msfee = 0;
        $mdfee = 0;
        $wsfee = 0;
        $wdfee = 0;
        $mixfee = 0;
        $teamfee = 0;
        $teamCount = 0;
        foreach($_POST as $key => $value) {
            if ($key == "SubmitButton") break;
            if (is_array($value)){
                switch ($key)
                {
                    case "MenSingle":
                        $msfee = count($value) * $_POST["MenSingleFee"];
                        echo "總計: $msfee";
                        break;
                    case "MenDouble":
                        $mdfee = count($value) * $_POST["MenDoubleFee"] / 2;
                        echo "總計: $mdfee";
                        break;
                    case "WomenSingle":
                        $wsfee = count($value) * $_POST["WomenSingleFee"];
                        echo "總計: $wsfee";
                        break;
                    case "WomenDouble":;
                        $wdfee = count($value) * $_POST["WomenDoubleFee"] / 2;
                        echo "總計: $wdfee";
                        break;
                    case "MixedDouble":
                        $mixfee = count($value) * $_POST["MixedDoubleFee"] / 2;
                        echo "總計: $mixfee";
                        break;
                    default:
                        $int = (int) filter_var($key, FILTER_SANITIZE_NUMBER_INT);
                        $int = $int + 1;
                        $teamCount = $teamCount + 1;
                        echo "團體名單 $int";
                }
                echo "<ol>";
                foreach($value as $subkey => $subvalue){
                    if ($key == "MenDouble" or $key == "WomenDouble" or $key == "MixedDouble") {
                        $memberIndex = intval($subkey) % 2;
                        $groupIndex = intval($subkey) / 2 + 1;
                        if ($memberIndex == 0) echo "<li><ul style='list-style-type: disc'><br>";
                        echo "<li>$subvalue </li>";
                        if ($memberIndex == 1) echo "</ul></li>";
                    } else echo "<li>$subvalue </li>";
                }
                echo "</ol>";
            } else {
                switch ($key) {
                    case "NameInCharge":
                        echo "<h2>填寫人</h2>";
                        echo "姓名: ";
                        break;
                    case "PhoneInCharge":
                        echo "手機: ";
                        break;
                    case "GameTitle":
                        echo "<hr><h2>賽事資訊</h2>";
                        echo "比賽名稱: ";
                        break;
                    case "Location":
                        echo "比賽地點: ";
                        break;
                    case "StartDay":
                        echo "日期 起: ";
                        break;
                    case "EndDay":
                        echo "日期 訖: ";
                        break;
                    case "MenSingleFee":
                        echo "<hr>";
                        echo "男單報名費 (每人): ";
                        break;
                    case "MenDoubleFee":
                        echo "<hr>";
                        echo "男雙報名費 (每組): ";
                        break;
                    case "WomenSingleFee":
                        echo "<hr>";
                        echo "女單報名費 (每人): ";
                        break;
                    case "WomenDoubleFee":
                        echo "<hr>";
                        echo "女雙報名費 (每組): ";
                        break;
                    case "MixedDoubleFee":
                        echo "<hr>";
                        echo "混雙報名費 (每組): ";
                        break;
                    case "TeamFee":
                        echo "<hr>";
                        echo "團體賽報名費 (每隊): ";
                        break;
                }
                echo "$value<br>";
            }
        } 
        
        if (array_key_exists("TeamFee", $_POST)){
            $teamfee = $teamCount * $_POST["TeamFee"];
            echo "團體總計: $teamfee";
        }
            
        $total = $msfee + $mdfee + $wsfee + $wdfee + $mixfee + $teamfee;
        echo "<br><h3>本次報名費總計: $total</h3>";
    ?>
    <button type="button" id="print" onclick="
        document.getElementById('print').style.display = 'none';
        print(document);
    ">友善列印</button>
</body>
</html>